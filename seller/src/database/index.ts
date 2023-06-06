import { connect, model, Model, Schema, Document, Types } from "mongoose";

export const dbConnector = async () => {
  try {
    await connect("mongodb://seller-mongo-service:27017/seller");
    // await connect(
    //   "mongodb+srv://ajayjangid921999:ajayjangid921999@node-microservices.pml2ax0.mongodb.net/seller"
    // );
    console.log("Seller db connected...");
  } catch (error) {
    console.error(error);
  }
};

/** Import the required mongoose methods.*/
export { model, Schema, Document, Types, Model };
