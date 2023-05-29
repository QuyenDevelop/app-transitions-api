import express from "express";
import { UserController } from "../../controllers";
import {
  isAuthenticated,
  isPermissionAdmin,
  isPermissionManage,
} from "../../middleWares";

const UserRouter = (router: express.Router) => {
  router.get("/user/get-profile", isAuthenticated, UserController.getUserInfo);
  router.delete("/user/delete", isAuthenticated, UserController.deleteOneUser);
  router.get(
    "/user/get-all",
    isAuthenticated,
    isPermissionManage,
    UserController.getAllUsers
  );
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
  router.post(
    "/user/update-profile",
    isAuthenticated,
    UserController.updateUserInfo
  );
  router.post("/user/active-user", UserController.activeUser);
};

export default UserRouter;
