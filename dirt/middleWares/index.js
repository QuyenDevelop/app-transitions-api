"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.isPermission = exports.isAuthenticated = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const config_1 = require("../config");
const isAuthenticated = async (req, res, next) => {
    try {
        const authHeader = req.header("Authorization");
        const token = authHeader && authHeader.split(" ")[1];
        if (!token) {
            return res.status(401).json({ errorMessage: "Access token is valid!!" });
        }
        const decode = jsonwebtoken_1.default.verify(token, config_1.env.TOKEN_SECRET);
        console.log("🚀 ~ file: index.ts:19 ~ decode:", decode);
        // req.userId = decode.userId;
        return next();
    }
    catch (error) {
        return res.status(403).json({ errorMessage: "Invalid Token!" });
    }
};
exports.isAuthenticated = isAuthenticated;
const isPermission = async (req, res, next) => {
    try {
        const accessToken = req.cookies["Access_Token"];
        if (!accessToken)
            return res
                .status(400)
                .json({ error_Code: 400, error_message: "Access token is valid!!" });
        // const user = await getUsersByToken(accessToken);
        // if (!user)
        //   return res
        //     .status(403)
        //     .json({ error_Code: 400, error_message: "Can't not find token!!" });
        // if (user.userName !== "admin")
        //   return res
        //     .status(403)
        //     .json({ error_Code: 400, error_message: "Permission denied!!" });
        // merge(req, { identity: user });
        return next();
    }
    catch (error) {
        return res
            .status(400)
            .json({ error_code: 400, error_message: error.message });
    }
};
exports.isPermission = isPermission;
//# sourceMappingURL=index.js.map