import { connect, Model, model, Schema,Document, Types } from "mongoose";

export const dbConnector = async () => {
  try {
    await connect("mongodb://order-mongo-service:27017/order");
    console.log("Order db connected...");
  } catch (error) {
    console.error(error);
  }
};

/** Import the required mongoose methods.*/
export { model, Schema, Document, Types, Model };
