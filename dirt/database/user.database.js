"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateUserByEmail = exports.deleteUserByEmail = exports.createUser = exports.getUsersByToken = exports.getUsersByEmail = exports.getUsers = exports.userModel = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const UserSchema = new mongoose_1.default.Schema({
    useName: { type: String, required: true },
    email: { type: String, required: true },
    authentication: {
        password: { type: String, required: false },
        token: { type: String, required: false },
    },
});
exports.userModel = mongoose_1.default.model("User", UserSchema);
const getUsers = () => exports.userModel.find();
exports.getUsers = getUsers;
const getUsersByEmail = (email) => exports.userModel.findOne({ email });
exports.getUsersByEmail = getUsersByEmail;
const getUsersByToken = (token) => exports.userModel.findOne({
    "authentication.token": token,
});
exports.getUsersByToken = getUsersByToken;
const createUser = (value) => new exports.userModel(value).save().then((user) => user.toObject());
exports.createUser = createUser;
const deleteUserByEmail = (email) => exports.userModel.findByIdAndRemove({ email: email });
exports.deleteUserByEmail = deleteUserByEmail;
const updateUserByEmail = (email, value) => exports.userModel.findOneAndUpdate({ email: email, value: value });
exports.updateUserByEmail = updateUserByEmail;
//# sourceMappingURL=user.database.js.map