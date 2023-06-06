import amqp, { Channel } from "amqplib";
import { log } from "console";
import sellerEventHandlerEvents from "../events/seller-event-handler.events";
import userEventHandlerEvents from "../events/user-event-handler.events";

/**
 * Config file for consumer.
 * */
let url = "amqp://auth-rabbitmq-service:5672";
//  url: "amqps://zjcmznwk:4yiy92qklc0bqnRQ9CAVo7zyxhObcdPj@puffin.rmq2.cloudamqp.com/zjcmznwk",
const config = {
  rabbitMQ: {
    url,
    userExchangeName: "user_detail_exchange",
    sellerExchangeName: "seller_detail_exchange",
    userOrderQueueName: "UserProductQueue",
    sellerOrderQueueName: "SellerProductQueue",
  },
};

/** This function is used to consume the upcoming messages inside queue. */
export async function consumeMessages() {
  const connection = await amqp.connect(config.rabbitMQ.url);
  const channel: Channel = await connection.createChannel();
  await channel.assertExchange(config.rabbitMQ.userExchangeName, "direct");
  await channel.assertExchange(config.rabbitMQ.sellerExchangeName, "direct");

  const userOrderQueue = await channel.assertQueue(
    config.rabbitMQ.userOrderQueueName
  );

  log("This created userOrder queue", userOrderQueue);
  const sellerOrderQueue = await channel.assertQueue(
    config.rabbitMQ.sellerOrderQueueName
  );

  log("This created sellerOrder queue", sellerOrderQueue);

  await channel.bindQueue(
    userOrderQueue.queue,
    config.rabbitMQ.userExchangeName,
    "user-info"
  );
  await channel.bindQueue(
    sellerOrderQueue.queue,
    config.rabbitMQ.sellerExchangeName,
    "seller-info"
  );

  channel.consume(userOrderQueue.queue, (msg) => {
    if (msg) {
      const queueInfo = JSON.parse(msg.content.toString());

      userEventHandlerEvents.operation(queueInfo.eventName, queueInfo.data);
      console.log("Messages in userOrderQueue", queueInfo);
      channel.ack(msg);
    }
  });

  channel.consume(sellerOrderQueue.queue, (msg) => {
    if (msg) {
      const queueInfo = JSON.parse(msg.content.toString());
      sellerEventHandlerEvents.operation(queueInfo.eventName, queueInfo.data);
      console.log("Messages in sellerOrderQueue", queueInfo);
      channel.ack(msg);
    }
  });
}
