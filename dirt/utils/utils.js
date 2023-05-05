"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const crypto_1 = __importDefault(require("crypto"));
const SECRET = "TRANSITIONS-REST-API";
const Utils = {
    random: () => crypto_1.default.randomBytes(128).toString("base64"),
    authentication: (salt, password) => crypto_1.default
        .createHmac("sha256", [salt, password].join("/"))
        .update(SECRET)
        .digest("hex"),
};
exports.default = Utils;
//# sourceMappingURL=utils.js.map