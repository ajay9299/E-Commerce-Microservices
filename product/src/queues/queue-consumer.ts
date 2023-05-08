import amqp, { Channel } from "amqplib";
import UserEventHandler from "../events/user-event-handler.events";
/**
 * Config file for consumer.
 * */
const config = {
  rabbitMQ: {
    url: "amqps://hidefrrv:hlCxqA6OaFFFPVx6nTqwh5xv9cFXEPXJ@puffin.rmq2.cloudamqp.com/hidefrrv",
    exchangeName: "user_detail_exchange",
    queueName: "ProductQueue",
  },
};

/** This function is used to consume the upcoming messages inside queue. */
export async function consumeMessages() {
  const connection = await amqp.connect(config.rabbitMQ.url);
  const channel: Channel = await connection.createChannel();
  await channel.assertExchange(config.rabbitMQ.exchangeName, "direct");
  const q = await channel.assertQueue(config.rabbitMQ.queueName);
  await channel.bindQueue(q.queue, config.rabbitMQ.exchangeName, "user-info");

  channel.consume(q.queue, (msg) => {
    if (msg) {
      const info = JSON.parse(msg.content.toString());
      UserEventHandler.operation(info.eventName, info.data);
      console.log(info);
      channel.ack(msg);
    }
  });
}
