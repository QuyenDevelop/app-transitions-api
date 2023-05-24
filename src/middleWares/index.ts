import { merge } from "lodash";
import express from "express";
import jwt from "jsonwebtoken";
import { env } from "../config";

export const isAuthenticated = async (
  req: express.Request,
  res: express.Response,
  next: express.NextFunction
) => {
  try {
    const authHeader = req.header("Authorization");
    const token = authHeader && authHeader.split(" ")[1];
    if (!token) {
      return res.status(401).json({ errorMessage: "Access token is valid!!" });
    }

    const decode = jwt.verify(token, env.TOKEN_SECRET);
    console.log("🚀 ~ file: index.ts:19 ~ decode:", decode);
    // req.userId = decode.userId;
    return next();
  } catch (error) {
    return res.status(403).json({ errorMessage: "Invalid Token!" });
  }
};

export const isPermission = async (
  req: express.Request,
  res: express.Response,
  next: express.NextFunction
) => {
  try {
    const accessToken = req.cookies["Access_Token"];
    if (!accessToken)
      return res
        .status(400)
        .json({ error_Code: 400, error_message: "Access token is valid!!" });
    // const user = await getUsersByToken(accessToken);
    // if (!user)
    //   return res
    //     .status(403)
    //     .json({ error_Code: 400, error_message: "Can't not find token!!" });
    // if (user.userName !== "admin")
    //   return res
    //     .status(403)
    //     .json({ error_Code: 400, error_message: "Permission denied!!" });
    // merge(req, { identity: user });
    return next();
  } catch (error) {
    return res
      .status(400)
      .json({ error_code: 400, error_message: error.message });
  }
};
