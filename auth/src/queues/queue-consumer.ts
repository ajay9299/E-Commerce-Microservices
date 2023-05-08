import amqp, { Channel } from "amqplib";
import { log } from "console";
/**
 * Config file for consumer.
 * */
const config = {
  rabbitMQ: {
    url: "amqps://hidefrrv:hlCxqA6OaFFFPVx6nTqwh5xv9cFXEPXJ@puffin.rmq2.cloudamqp.com/hidefrrv",
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
  log("This created queue", q);
  await channel.bindQueue(q.queue, config.rabbitMQ.exchangeName, "Info");

  channel.consume(q.queue, (msg) => {
    if (msg) {
      const data = JSON.parse(msg.content.toString());
      console.log(data);
      channel.ack(msg);
    }
  });
}
