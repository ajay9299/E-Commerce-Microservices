import { connect, Model, model, Schema, Document, Types } from "mongoose";

export const dbConnector = async () => {
  try {
    await connect("mongodb://order-mongo-service:27017/order");
    // await connect(
    //   "mongodb+srv://ajayjangid921999:ajayjangid921999@node-microservices.pml2ax0.mongodb.net/order"
    // );
    console.log("Order db connected...");
  } catch (error) {
    console.error(error);
  }
};

/** Import the required mongoose methods.*/
export { model, Schema, Document, Types, Model };
