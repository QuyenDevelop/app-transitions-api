import { AuthController } from "../../controllers";
import express from "express";

export default (router: express.Router) => {
  router.post("/auth/register", AuthController.register);
  router.post("/auth/login", AuthController.login);
};
