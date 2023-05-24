"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Env_config_1 = __importDefault(require("../config/Env.config"));
const mongodb_1 = require("mongodb");
const client = new mongodb_1.MongoClient(Env_config_1.default.MONGODB_URI, {
    serverApi: {
        version: mongodb_1.ServerApiVersion.v1,
        strict: true,
        deprecationErrors: true,
    },
});
const adminDB = client.db().admin();
// const listDatabases = async () => {
//   const databases = await adminDB.listDatabases();
//   console.log("listDatabases:", databases.databases);
// };
const mongoDBConnect = async () => {
    try {
        // Connect the client to the server	(optional starting in v4.7)
        await client.connect();
        // Send a ping to confirm a successful connection
        console.log("Databases Connected Successfully");
        await adminDB.command({ ping: 1 });
        // await listDatabases();
    }
    finally {
        // Ensures that the client will close when you finish/error
        await client.close();
    }
};
exports.default = mongoDBConnect;
//# sourceMappingURL=MongoDB.config.js.map