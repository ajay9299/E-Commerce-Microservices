import amqp, { Channel } from "amqplib";
/**
 * Config file for consumer.
 * */ 
const config = {
  rabbitMQ: {
    url: "amqps://dhgvaxcl:wdYGklBnb696efoEYeRKcZJsIhjVZFfh@cougar.rmq.cloudamqp.com/dhgvaxcl",
    exchangeName: "user_detail_exchange",
    queueName: "AuthQueue",
  },
};

/** This function is used to consume the upcoming messages inside queue. */
export async function consumeMessages() {
  const connection = await amqp.connect(config.rabbitMQ.url);
  const channel: Channel = await connection.createChannel();
  await channel.assertExchange(config.rabbitMQ.exchangeName, "direct");
  const q = await channel.assertQueue(config.rabbitMQ.queueName);
  await channel.bindQueue(q.queue, config.rabbitMQ.exchangeName, "Info");

  channel.consume(q.queue, (msg) => {
    if (msg) {
      const data = JSON.parse(msg.content.toString());
      console.log(data);
      channel.ack(msg);
    }
  });
}


