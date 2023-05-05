import express from "express";
import authentication from "./version_1/authentication";

const routers = express.Router();

export default (): express.Router => {
  authentication(routers);
  return routers;
};
