"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const argon = __importStar(require("argon2"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const modules_1 = require("../modules");
const config_1 = require("../config");
const AuthController = {
    register: async (req, res) => {
        try {
            const { username, password } = req.body;
            // ---- check body request
            const exitingUser = await (0, modules_1.findAccount)(username);
            if (exitingUser) {
                return res.status(403).json({
                    status: 403,
                    errorMessage: "Username already used!!",
                });
            }
            // ---- create new user into database and hash password
            const hashPassword = await argon.hash(password);
            const account = await (0, modules_1.createUser)({
                username,
                password: hashPassword,
            });
            // ---- return token
            const accessToken = jsonwebtoken_1.default.sign({ userId: account._id }, config_1.env.TOKEN_SECRET);
            return res
                .json({
                status: 200,
                error_message: "",
                accessToken,
            })
                .end();
        }
        catch (_error) {
            return res.status(400).json({
                status: 400,
                errorMessage: "Internal Server Error",
            });
        }
    },
    login: async (req, res) => {
        try {
            const { username, password } = req.body;
            // ---- check body request
            const exitingUser = await (0, modules_1.findAccount)(username);
            if (!exitingUser) {
                return res.status(403).json({
                    status: 403,
                    errorMessage: "Incorrect username or password!",
                });
            }
            // ---- create new user into database and hash password
            const comparePassword = await argon.verify(exitingUser.password, password);
            if (!comparePassword) {
                return res.status(403).json({
                    status: 403,
                    errorMessage: "Incorrect username or password!",
                });
            }
            // ---- return token
            const accessToken = jsonwebtoken_1.default.sign({ userId: exitingUser._id }, config_1.env.TOKEN_SECRET);
            return res
                .json({
                status: 200,
                error_message: "",
                accessToken,
            })
                .end();
        }
        catch (error) {
            return res.status(400).json({
                status: 400,
                errorMessage: "Internal Server Error!",
            });
        }
    },
    logout: async (req, res) => {
        try {
            // ---- return
            return res.json({}).end();
        }
        catch (error) {
            return res.status(400).json({
                status: 400,
                errorMessage: "Internal Server Error!",
            });
        }
    },
};
exports.default = AuthController;
//# sourceMappingURL=Auth.controller.js.map