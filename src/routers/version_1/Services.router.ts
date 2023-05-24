import express from "express";
import { ServicesController } from "../../controllers";
import { isPermission } from "../../middleWares";

const ServicesRouter = (router: express.Router) => {
  router.post(
    "/service/create",
    isPermission,
    ServicesController.createService
  );
  router.get("/service/getAllServices", ServicesController.getAllServices);
  router.get("/service/update-service", ServicesController.updateService);
};

export default ServicesRouter;
