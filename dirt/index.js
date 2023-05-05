"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const http_1 = __importDefault(require("http"));
const compression_1 = __importDefault(require("compression"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const body_parser_1 = __importDefault(require("body-parser"));
const mongoose_1 = __importDefault(require("mongoose"));
const routers_1 = __importDefault(require("./routers"));
const app = (0, express_1.default)();
app.use((0, cors_1.default)({
    credentials: true,
}));
app.use((0, compression_1.default)());
app.use((0, cookie_parser_1.default)());
app.use(body_parser_1.default.json());
const server = http_1.default.createServer(app);
const hostName = "localhost";
const port = 3000;
server.listen(port, hostName, () => {
    console.log("This is my first time");
});
const uri_DB = "mongodb+srv://transition_admin:admin123aA@transitions-db.wd3orbt.mongodb.net/?retryWrites=true&w=majority";
// usename = "transition_admin";
// password = "admin123aA";
// myAddress = "116.97.240.98/32";
mongoose_1.default.Promise = Promise;
mongoose_1.default.connect(uri_DB);
mongoose_1.default.connection.on("err", (error) => console.log(error));
app.use("/", (0, routers_1.default)());
//# sourceMappingURL=index.js.map