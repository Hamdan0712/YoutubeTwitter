import mongoose from "mongoose";
import { DB_name } from "../constants.js";

const connectDb = async () => {
  try {
    if (!process.env.MONGODB_URI) {
      throw new Error("MONGODB_URI is not defined in the environment.");
    }

    const connectionInstance = await mongoose.connect(process.env.MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log(
      `\n MONGo db connected!..DB host:${connectionInstance.connection.host}`
    );
  } catch (error) {
    console.log("ERR", error);
    process.exit(1);
  }
};

export default connectDb;
