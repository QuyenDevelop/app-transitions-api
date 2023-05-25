import express from "express";
import { ServicesController } from "../../controllers";
import { isAuthenticated, isPermissionManage } from "../../middleWares";
import {} from "../../middleWares/index";

const ServicesRouter = (router: express.Router) => {
  router.post(
    "/service/create",
    isAuthenticated,
    isPermissionManage,
    ServicesController.createService
  );
  router.get(
    "/service/get-all",
    isAuthenticated,
    ServicesController.getAllServices
  );
  router.get(
    "/service/update-service",
    isAuthenticated,
    isPermissionManage,
    ServicesController.updateService
  );
};

export default ServicesRouter;
