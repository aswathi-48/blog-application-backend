import mongoose from "mongoose";

const connection = async () => {
  if (!process.env.MOGOURI) {
    throw new Error("MOGOURI is not defined in .env file");
  }

  await mongoose.connect(process.env.MOGOURI);
  console.log("MongoDB connected");
};

export default connection;
