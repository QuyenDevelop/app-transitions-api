"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Env_config_1 = __importDefault(require("../config/Env.config"));
const mongoose_1 = __importDefault(require("mongoose"));
// usename = "transition_admin";
// password = "admin123aA";
// myAddress = "116.97.240.98/32";
const mongooseConnect = async () => {
    try {
        mongoose_1.default.Promise = Promise;
        mongoose_1.default.connect(Env_config_1.default.MONGODB_URI);
        mongoose_1.default.connection.on("err", (error) => console.log(error));
    }
    catch (error) {
        console.log("error:", error);
    }
};
exports.default = mongooseConnect;
//# sourceMappingURL=Mongoose.config.js.map