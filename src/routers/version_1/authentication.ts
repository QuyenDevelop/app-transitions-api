import { AuthController } from "../../controllers";
import express from "express";
import { isAuthenticated } from "../../middleWares";

export default (router: express.Router) => {
  router.post("/auth/register", AuthController.register);
  router.post("/auth/login", AuthController.login);
  router.post("/auth/logout", isAuthenticated, AuthController.login);
};
