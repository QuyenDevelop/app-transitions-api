import env from "../config/Env.config";
import { MongoClient, ServerApiVersion } from "mongodb";

const client = new MongoClient(env.MONGODB_URI, {
  serverApi: {
    version: ServerApiVersion.v1,
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
  } finally {
    // Ensures that the client will close when you finish/error
    await client.close();
  }
};

export default mongoDBConnect;
