import mongoose from "mongoose";

const connectDb = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URL)
    console.log(process.env.MONGO_URL , "I am here")
    console.log("MongoDB connected successfully");
  } catch (error) {
    console.log("Mongodb connection failed", error);
  }
};

export default connectDb;