"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const database_1 = require("../database");
const utils_1 = require("../utils");
const AuthController = {
    register: async (req, res) => {
        try {
            const { email, password, userName } = req.body;
            // ---- check body request
            const exitingUser = await (0, database_1.getUsersByEmail)(email);
            if (!email || // ---- check email
                !password || // ---- check password
                !userName || // ---- check userName
                !exitingUser // ---- check isValid email
            ) {
                return res.sendStatus(400);
            }
            // ---- create new user into database and Encryption password
            const salt = utils_1.Utils.random();
            const user = await (0, database_1.createUser)({
                userName,
                email,
                authentication: {
                    salt,
                    password: utils_1.Utils.authentication(salt, password),
                },
            });
            // ---- return user data and status code = 200
            return res.sendStatus(200).json(user).end();
        }
        catch (error) {
            return res.sendStatus(400);
        }
    },
};
exports.default = AuthController;
//# sourceMappingURL=Auth.controller.js.map