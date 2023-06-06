import amqp, { Channel } from "amqplib";
import userEventHandlerEvents from "../events/user-event-handler.events";
import { log } from "console";
import productEventHandlerEvents from "../events/product-event-handler.events";
/**
 * Config file for consumer.
 * */
let url = "amqp://auth-rabbitmq-service:5672";
// url: "amqps://zjcmznwk:4yiy92qklc0bqnRQ9CAVo7zyxhObcdPj@puffin.rmq2.cloudamqp.com/zjcmznwk",
const config = {
  rabbitMQ: {
    url,
    userExchangeName: "user_detail_exchange",
    productExchangeName: "product_detail_exchange",
    productOrderQueueName: "ProductOrderQueue",
    userOrderQueueName: "UserOrderQueue",
  },
};

/** This function is used to consume the upcoming messages inside queue. */
export async function consumeMessages() {
  const connection = await amqp.connect(config.rabbitMQ.url);
  const channel: Channel = await connection.createChannel();
  await channel.assertExchange(config.rabbitMQ.userExchangeName, "direct");
  await channel.assertExchange(config.rabbitMQ.productExchangeName, "direct");

  const userOrderQueue = await channel.assertQueue(
    config.rabbitMQ.userOrderQueueName
  );

  log("This created userOrder queue", userOrderQueue);
  const productOrderQueue = await channel.assertQueue(
    config.rabbitMQ.productOrderQueueName
  );

  log("This created productOrder queue", productOrderQueue);

  await channel.bindQueue(
    userOrderQueue.queue,
    config.rabbitMQ.userExchangeName,
    "user-info"
  );
  await channel.bindQueue(
    productOrderQueue.queue,
    config.rabbitMQ.productExchangeName,
    "product-info"
  );

  channel.consume(userOrderQueue.queue, (msg) => {
    if (msg) {
      const queueInfo = JSON.parse(msg.content.toString());

      userEventHandlerEvents.operation(queueInfo.eventName, queueInfo.data);
      console.log("Messages in userOrderQueue", queueInfo);
      channel.ack(msg);
    }
  });

  channel.consume(productOrderQueue.queue, (msg) => {
    if (msg) {
      const queueInfo = JSON.parse(msg.content.toString());
      productEventHandlerEvents.operation(queueInfo.eventName, queueInfo.data);
      console.log("Messages in productOrderQueue", queueInfo);
      channel.ack(msg);
    }
  });
}
