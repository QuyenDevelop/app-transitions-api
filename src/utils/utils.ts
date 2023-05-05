import crypto from "crypto";

const SECRET = "TRANSITIONS-REST-API";

const Utils = {
  random: () => crypto.randomBytes(128).toString("base64"),
  authentication: (salt: string, password: string) =>
    crypto
      .createHmac("sha256", [salt, password].join("/"))
      .update(SECRET)
      .digest("hex"),
};

export default Utils;
