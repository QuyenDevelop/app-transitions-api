import http from "http";

import { expressConfig, mongooseConnect } from "./config";
import routers from "./routers";

const PORT = 8000;
const server = http.createServer(expressConfig);

server.listen(PORT, () => {
  console.log(`This is server listening on http://localhost:${PORT}/`);
});

// mongoDBConnect()?.catch(err => console.log(err));
mongooseConnect()?.catch(err => console.log(err));

expressConfig.use("/", routers());
