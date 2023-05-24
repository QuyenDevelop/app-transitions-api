"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const http_1 = __importDefault(require("http"));
const config_1 = require("./config");
const routers_1 = __importDefault(require("./routers"));
const PORT = 8000;
const server = http_1.default.createServer(config_1.expressConfig);
server.listen(PORT, () => {
    console.log(`This is server listening on http://localhost:${PORT}/`);
});
// mongoDBConnect()?.catch(err => console.log(err));
(0, config_1.mongooseConnect)()?.catch(err => console.log(err));
config_1.expressConfig.use("/", (0, routers_1.default)());
//# sourceMappingURL=index.js.map