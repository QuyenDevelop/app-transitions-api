"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const compression_1 = __importDefault(require("compression"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const body_parser_1 = __importDefault(require("body-parser"));
const expressConfig = (0, express_1.default)();
expressConfig.use((0, cors_1.default)({
    credentials: true,
}));
expressConfig.use((0, compression_1.default)());
expressConfig.use((0, cookie_parser_1.default)());
expressConfig.use(body_parser_1.default.json());
exports.default = expressConfig;
//# sourceMappingURL=Express.config.js.map