"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ServicesController = exports.UserController = exports.AuthController = void 0;
const Auth_controller_1 = __importDefault(require("./Auth.controller"));
exports.AuthController = Auth_controller_1.default;
const User_controller_1 = __importDefault(require("./User.controller"));
exports.UserController = User_controller_1.default;
const Services_controller_1 = __importDefault(require("./Services.controller"));
exports.ServicesController = Services_controller_1.default;
//# sourceMappingURL=index.js.map