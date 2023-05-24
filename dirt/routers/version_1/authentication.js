"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const controllers_1 = require("../../controllers");
exports.default = (router) => {
    router.post("/auth/register", controllers_1.AuthController.register);
    router.post("/auth/login", controllers_1.AuthController.login);
};
//# sourceMappingURL=authentication.js.map