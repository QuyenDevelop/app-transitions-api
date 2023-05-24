"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const modules_1 = require("../modules");
const UserController = {
    getAllUsers: async (_req, res) => {
        try {
            const users = await (0, modules_1.getUsers)();
            return res.status(200).json(users);
        }
        catch (error) {
            console.log("🚀 ~ error:", error);
            return res.status(400);
        }
    },
};
exports.default = UserController;
//# sourceMappingURL=User.controller.js.map