import express from "express";
import { UserController } from "../../controllers";
import { isAuthenticated } from "../../middleWares";

const UserRouter = (router: express.Router) => {
  router.get("/user/getAllUsers", isAuthenticated, UserController.getAllUsers);
};

export default UserRouter;
