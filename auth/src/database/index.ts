import { connect, model, Model, Schema, Document, Types } from "mongoose";

export const dbConnector = async () => {
  try {
    await connect("mongodb://auth-mongo-service:27017/auth");
    // await connect(
    //   "mongodb+srv://ajayjangid921999:ajayjangid921999@node-microservices.pml2ax0.mongodb.net/auth"
    // );
    console.log("Auth db connected...");
  } catch (error) {
    console.error(error);
  }
};

/** Import the required mongoose methods.*/
export { model, Schema, Document, Types, Model };
