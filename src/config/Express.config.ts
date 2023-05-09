import express from "express";
import cors from "cors";
import compression from "compression";
import cookieParser from "cookie-parser";
import bodyParser from "body-parser";

const expressConfig = express();

expressConfig.use(
  cors({
    credentials: true,
  })
);
expressConfig.use(compression());
expressConfig.use(cookieParser());
expressConfig.use(bodyParser.json());

export default expressConfig;
