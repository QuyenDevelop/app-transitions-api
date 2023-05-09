import express from "express";
import cors from "cors";
import http from "http";
import compression from "compression";
import cookieParser from "cookie-parser";
import bodyParser from "body-parser";
import mongoose from "mongoose";

import routers from "./routers";

const app = express();

app.use(
  cors({
    credentials: true,
  })
);
app.use(compression());
app.use(cookieParser());
app.use(bodyParser.json());

const server = http.createServer(app);
const port = 8000;

server.listen(port, () => {
  console.log("This is server listening on http://localhost:8000/");
});

const uri_DB =
  "mongodb+srv://transition_admin:admin123aA@transitions-db.wd3orbt.mongodb.net/?retryWrites=true&w=majority";

// usename = "transition_admin";
// password = "admin123aA";
// myAddress = "116.97.240.98/32";

mongoose.Promise = Promise;
mongoose.connect(uri_DB);
mongoose.connection.on("err", (error: Error) => console.log(error));
app.use("/", routers());
