import amqp, { Channel } from "amqplib";
const config = {
  rabbitMQ: {
    url: "amqps://xqgdmmzr:f32M8aeQUmgcriKEM9x3AvcP-ZMT-MxJ@puffin.rmq2.cloudamqp.com/xqgdmmzr",
    exchangeName: "user_detail_exchange",
  },
};

/** This function is used to produce messages inside queue*/
class Producer {
  private channel: Channel | undefined;

  async createChannel() {
    const connection = await amqp.connect(config.rabbitMQ.url);
    this.channel = await connection.createChannel();
  }

  async publishMessage(routingKey: string, data: any, eventName: string) {
    if (!this.channel) {
      await this.createChannel();
    }

    const exchangeName = config.rabbitMQ.exchangeName;
    await this.channel!.assertExchange(exchangeName, "direct");

    this.channel!.publish(
      exchangeName,
      routingKey,
      Buffer.from(JSON.stringify({ data, eventName })),
      { persistent: true }
    );

    console.log(
      `The new ${routingKey} log is sent to exchange ${exchangeName}`
    );
  }
}

export default new Producer();
