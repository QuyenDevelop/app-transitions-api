import crypto from "crypto";
import { EUserRole } from "../models";
import jwt from "jsonwebtoken";
import env from "../config/Env.config";

interface JwtPayload {
  userId: string;
  role: EUserRole;
  iat: number;
}

export const Utils = {
  random: () => crypto.randomBytes(128).toString("base64"),
  authentication: (salt: string, password: string) =>
    crypto
      .createHmac("sha256", [salt, password].join("/"))
      .update(env.TOKEN_SECRET)
      .digest("hex"),
  isAdminPermission: (role: string) =>
    role === EUserRole.Admin ? true : false,
  isManagePermission: (role: string) => {
    return role === EUserRole.Admin || role === EUserRole.Manager
      ? true
      : false;
  },
  decodeAccessToken: (token: string) => {
    const user = jwt.verify(token, env.TOKEN_SECRET) as JwtPayload;
    return user;
  },
};
