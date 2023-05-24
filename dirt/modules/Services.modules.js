"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteServices = exports.updateServices = exports.createServices = exports.getAllServices = exports.RoomServiceModel = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const RoomServiceSchema = new mongoose_1.default.Schema({
    service_id: { type: "string", required: true },
    service_name: { type: "string", required: true },
    unit: { type: "string" },
    prices: { type: "string" },
    description: { type: "string" },
});
exports.RoomServiceModel = mongoose_1.default.model("services", RoomServiceSchema);
const getAllServices = () => exports.RoomServiceModel.find();
exports.getAllServices = getAllServices;
const createServices = async (value) => {
    const service = await new exports.RoomServiceModel(value).save();
    return service.toObject();
};
exports.createServices = createServices;
const updateServices = (service_id, value) => {
    return exports.RoomServiceModel.findOneAndUpdate({ service_id, value });
};
exports.updateServices = updateServices;
const deleteServices = (service_id) => {
    return exports.RoomServiceModel.findByIdAndRemove({ service_id });
};
exports.deleteServices = deleteServices;
//# sourceMappingURL=Services.modules.js.map