import mongoose from "mongoose";
// 12qwaszx
let isConnected = false;

export const connectToDB = async (params) => {
  mongoose.set("strictQuery", true);

  if (isConnected) {
    console.log("mongodb is alreadyt connected");
    return;
  }

  try {
    await mongoose.connect(process.env.MONGODB_URI, {
      dbName: "share_prompt",
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    isConnected = true;
    console.log("Mongodb Connected");
  } catch (error) {
    console.log(error);
  }
};
