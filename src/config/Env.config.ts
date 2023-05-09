import * as dotenv from "dotenv";
dotenv.config();

const env = {
  MONGODB_URI: process.env.MONGODB_URI,
  HOST_NAME: process.env.HOST_NAME,
  PORT: process.env.PORT,
};

export default env;
