import express from "express";
import { RoomController } from "../../controllers";
import { isAuthenticated, isPermissionAdmin } from "../../middleWares";
import {} from "../../middleWares/index";

const RoomRouter = (router: express.Router) => {
  router.post(
    "/room/create",
    isAuthenticated,
    isPermissionAdmin,
    RoomController.create
  );
  router.get("/room/get-all", RoomController.getListAll);
  router.get("/room/get-list-by-house", RoomController.getListRoomByHouseId);
  router.get("/room/get-detail", RoomController.getDetail);
  router.get(
    "/room/update",
    isAuthenticated,
    isPermissionAdmin,
    RoomController.updateDetailById
  );
  router.get(
    "/room/update-status",
    isAuthenticated,
    isPermissionAdmin,
    RoomController.updateStatus
  );
  router.get(
    "/room/delete",
    isAuthenticated,
    isPermissionAdmin,
    RoomController.deleteById
  );
  router.get(
    "/room/delete-all",
    isAuthenticated,
    isPermissionAdmin,
    RoomController.deleteAll
  );
};

export default RoomRouter;
