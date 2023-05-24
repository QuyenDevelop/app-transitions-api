"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const controllers_1 = require("../../controllers");
const middleWares_1 = require("../../middleWares");
const UserRouter = (router) => {
    router.get("/user/getAllUsers", middleWares_1.isAuthenticated, controllers_1.UserController.getAllUsers);
};
exports.default = UserRouter;
//# sourceMappingURL=users.router.js.map