"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const authentication_1 = __importDefault(require("./version_1/authentication"));
const users_router_1 = __importDefault(require("./version_1/users.router"));
const Services_router_1 = __importDefault(require("./version_1/Services.router"));
const routers = express_1.default.Router();
exports.default = () => {
    (0, authentication_1.default)(routers);
    (0, users_router_1.default)(routers);
    (0, Services_router_1.default)(routers);
    return routers;
};
//# sourceMappingURL=index.js.map