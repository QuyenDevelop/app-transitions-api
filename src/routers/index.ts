import express from "express";
import authentication from "./version_1/authentication";
import userRouter from "./version_1/users.router";

const routers = express.Router();

export default (): express.Router => {
  authentication(routers);
  userRouter(routers);
  return routers;
};
