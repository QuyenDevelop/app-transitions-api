// import { merge } from "lodash";
import express from "express";
import jwt from "jsonwebtoken";
import { env } from "../config";
import { Utils } from "../utils";

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

    const decodeToken = jwt.verify(token, env.TOKEN_SECRET);
    if (!decodeToken) {
      return res.status(401).json({ errorMessage: "Invalid Token!!" });
    }
    return next();
  } catch (error) {
    return res.status(403).json({ errorMessage: "Invalid Token!" });
  }
};

export const isPermissionManage = async (
  req: express.Request,
  res: express.Response,
  next: express.NextFunction
) => {
  try {
    const authHeader = req.header("Authorization");
    const token = Utils.decodeAccessToken(authHeader.split(" ")[1]);

    if (!Utils.isManagePermission(token.role)) {
      return res.status(403).json({ errorMessage: "Permission Denied!!" });
    }

    return next();
  } catch (error) {
    return res.status(400).json({ errorMessage: "Internal Server Error!!" });
  }
};

export const isPermissionAdmin = async (
  req: express.Request,
  res: express.Response,
  next: express.NextFunction
) => {
  try {
    const authHeader = req.header("Authorization");
    const token = Utils.decodeAccessToken(authHeader.split(" ")[1]);

    if (!Utils.isAdminPermission(token.role)) {
      return res.status(403).json({ errorMessage: "Permission Denied!!" });
    }
    return next();
  } catch (error) {
    return res.status(400).json({ errorMessage: "Internal Server Error!!" });
  }
};
