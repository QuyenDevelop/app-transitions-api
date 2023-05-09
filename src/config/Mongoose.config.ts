import env from "../config/Env.config";
import mongoose from "mongoose";

// usename = "transition_admin";
// password = "admin123aA";
// myAddress = "116.97.240.98/32";

const mongooseConnect = async () => {
  try {
    mongoose.Promise = Promise;
    mongoose.connect(env.MONGODB_URI);
    mongoose.connection.on("err", (error: Error) => console.log(error));
  } catch (error) {
    console.log("error:", error);
  }
};

export default mongooseConnect;
