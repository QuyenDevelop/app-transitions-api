import express from "express";
import authentication from "./version_1/authentication";
import userRouter from "./version_1/users.router";
import servicesRouter from "./version_1/Services.router";
import ServiceHouse from "./version_1/ServiceHouse.router";
import RoomRouter from "./version_1/Room.router";

const routers = express.Router();

export default (): express.Router => {
  authentication(routers);
  userRouter(routers);
  servicesRouter(routers);
  ServiceHouse(routers);
  RoomRouter(routers);
  return routers;
};
