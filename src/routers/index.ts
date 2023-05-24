import express from "express";
import authentication from "./version_1/authentication";
import userRouter from "./version_1/users.router";
import servicesRouter from "./version_1/Services.router";

const routers = express.Router();

export default (): express.Router => {
  authentication(routers);
  userRouter(routers);
  servicesRouter(routers);
  return routers;
};
