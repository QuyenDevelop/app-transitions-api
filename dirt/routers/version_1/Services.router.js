"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const controllers_1 = require("../../controllers");
const middleWares_1 = require("../../middleWares");
const ServicesRouter = (router) => {
    router.post("/service/create", middleWares_1.isPermission, controllers_1.ServicesController.createService);
    router.get("/service/getAllServices", controllers_1.ServicesController.getAllServices);
    router.get("/service/update-service", controllers_1.ServicesController.updateService);
};
exports.default = ServicesRouter;
//# sourceMappingURL=Services.router.js.map