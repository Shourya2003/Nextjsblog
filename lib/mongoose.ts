import mongoose from "mongoose";

const connectDB = async () => {
  if (mongoose.connection.readyState >= 1) return; 
  try {
    await mongoose.connect("mongodb://localhost:27017/Blog" as string);
    console.log("MongoDB connected successfully");
  } catch (error) {
    console.error("MongoDB connection error:", error);
    process.exit(1); 
  }
};

process.on('SIGINT', async () => {
  await mongoose.connection.close();
  console.log("MongoDB disconnected due to application termination");
  process.exit(0);
});

export default connectDB;
