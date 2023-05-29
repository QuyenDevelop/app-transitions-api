import express from "express";
import { ServiceHouseController } from "../../controllers";
import { isAuthenticated, isPermissionAdmin } from "../../middleWares";
import {} from "../../middleWares/index";

const ServiceHouse = (router: express.Router) => {
  router.post(
    "/service-house/create",
    isAuthenticated,
    isPermissionAdmin,
    ServiceHouseController.create
  );
  router.get(
    "/service-house/get-all",
    ServiceHouseController.getListServiceHouse
  );
  router.get(
    "/service-house/get-detail",
    ServiceHouseController.getDetailServiceHouse
  );
  router.get(
    "/service-house/update",
    isAuthenticated,
    isPermissionAdmin,
    ServiceHouseController.updateServiceHouseById
  );
  router.get(
    "/service-house/update-status",
    isAuthenticated,
    isPermissionAdmin,
    ServiceHouseController.updateStatusServiceHouse
  );
  router.get(
    "/service-house/update-manage",
    isAuthenticated,
    isPermissionAdmin,
    ServiceHouseController.updateManageServiceHouse
  );
  router.get(
    "/service-house/delete",
    isAuthenticated,
    isPermissionAdmin,
    ServiceHouseController.deleteById
  );
  router.get(
    "/service-house/delete-all",
    isAuthenticated,
    isPermissionAdmin,
    ServiceHouseController.deleteAll
  );
};

export default ServiceHouse;
