import mongoose from "mongoose";

const connect = async () => {
  try {
    await mongoose.connect(process.env.SECRET_URL);
  } catch (error) {
    throw new Error("Failed connection");
  }
};

export default connect;
