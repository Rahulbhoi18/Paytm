import mongoose from "mongoose";

export const connectDb = async (req, res) => {
  try {
    const connectionInstance = await mongoose.connect(process.env.MONGO_URI);
    if (connectionInstance) {
      console.log(`DB:HOST ${connectionInstance.connection.host}`);
      console.log("Mongodb connection successfull");
    }
  } catch (error) {
    console.log("Mongodb connection failed", error);
  }
};
