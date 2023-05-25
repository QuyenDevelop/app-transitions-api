import http from "http";

import { env, expressConfig, mongooseConnect } from "./config";
import routers from "./routers";

const server = http.createServer(expressConfig);

server.listen(env.PORT, () => {
  console.log(`This is server listening on http://localhost:${env.PORT}/`);
});

// mongoDBConnect()?.catch(err => console.log(err));
mongooseConnect()?.catch(err => console.log(err));

expressConfig.use("/", routers());
