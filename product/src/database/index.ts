import { connect, Types } from "mongoose";

export const dbConnector = async () => {
  try {
    await connect(
      "mongodb+srv://ajayjangid921999:ajayjangid921999@node-microservices.pml2ax0.mongodb.net/product"
    );
    console.log("Product db connected...");
  } catch (error) {
    console.error(error);
  }
};

/** Import the required mongoose methods.*/
export { Types };
