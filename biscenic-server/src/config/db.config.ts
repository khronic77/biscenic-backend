import mongoose from "mongoose";
import colors from "colors";
import dotenv from "dotenv";

dotenv.config();

const connectDB = async () => {
  try {
    // MongoDB connection using MONGODB_URI from .env
    const conn = await mongoose.connect(process.env.MONGODB_URI!);

    console.log(colors.green.bold(`MongoDB connected: ${conn.connection.host}`));
  } catch (error: any) {
    console.error(colors.red.bold(`MongoDB connection error: ${error.message}`));
    process.exit(1); // Exit with failure code
  }
};

export default connectDB;