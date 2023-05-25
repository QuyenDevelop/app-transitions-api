"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.userModel = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const UserSchema = new mongoose_1.default.Schema({
    username: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    profile: {
        name: { type: String },
        birthday: { type: Date },
        phone: { type: String },
        address: { type: String },
        identify_code: { type: String },
        identify_address: { type: String },
    },
});
exports.userModel = mongoose_1.default.model("User", UserSchema);
//# sourceMappingURL=Users.modules.js.map