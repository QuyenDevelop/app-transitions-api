"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.updatePassword = exports.deleteUser = exports.createUser = exports.findAccount = exports.getUsers = exports.authModel = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const AuthSchema = new mongoose_1.default.Schema({
    username: { type: String, required: true, unique: true },
    password: { type: String, required: true },
});
exports.authModel = mongoose_1.default.model("accounts", AuthSchema);
const getUsers = () => exports.authModel.find();
exports.getUsers = getUsers;
const findAccount = (username) => {
    return exports.authModel.findOne({ username: username });
};
exports.findAccount = findAccount;
const createUser = async (value) => {
    const account = await new exports.authModel(value).save();
    return account.toObject();
};
exports.createUser = createUser;
const deleteUser = (email) => {
    return exports.authModel.findByIdAndRemove({ email: email });
};
exports.deleteUser = deleteUser;
const updatePassword = (email, value) => exports.authModel.findOneAndUpdate({ email: email, value: value });
exports.updatePassword = updatePassword;
//# sourceMappingURL=Auth.modules.js.map