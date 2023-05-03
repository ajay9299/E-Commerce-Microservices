import { connect } from "mongoose";

export const dbConnector = async () => {
  try {
    await connect("mongodb://product-mongo-service:27017/product");
    console.log("Product db connected...");
  } catch (error) {
    console.error(error);
  }
};
