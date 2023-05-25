import express from "express";
import { UserController } from "../../controllers";
import {
  isAuthenticated,
  isPermissionAdmin,
  isPermissionManage,
} from "../../middleWares";

const UserRouter = (router: express.Router) => {
  router.get("/user/get-all", isAuthenticated, UserController.getAllUsers);
  router.get("/user/get-profile", isAuthenticated, UserController.getUserInfo);
  router.delete("/user/delete", isAuthenticated, UserController.deleteOneUser);
  router.delete(
    "/user/delete-all",
    isAuthenticated,
    isPermissionAdmin,
    UserController.deleteOneUser
  );
  router.post(
    "/user/lock-user",
    isAuthenticated,
    isPermissionManage,
    UserController.lockedUser
  );
  router.post(
    "/user/unlock-user",
    isAuthenticated,
    isPermissionManage,
    UserController.unlockedUser
  );
};

export default UserRouter;
