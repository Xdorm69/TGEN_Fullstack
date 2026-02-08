import mongoose from "mongoose";
import config from "./config.js";

const connectDB = () => {
    mongoose.promise = global.Promise;
    mongoose.set("strictQuery", false);
    mongoose
      .connect(config.MONGODB_URI)
      .then(console.log("Connected to database"))
      .catch((err) => console.log(err));
}

export default connectDB;

