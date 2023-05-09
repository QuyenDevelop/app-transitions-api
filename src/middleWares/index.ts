import { merge } from "lodash";
import { getUsersByToken } from "../database";
import express from "express";

export const isAuthenticated = async (
  req: express.Request,
  res: express.Response,
  next: express.NextFunction
) => {
  try {
    const accessToken = req.cookies["Access_Token"];
    if (!accessToken) return res.status(400).json({ error_Code: 400 });
    const user = await getUsersByToken(accessToken);
    if (!user) return res.status(403);

    merge(req, { identity: user });
    return next();
  } catch (error) {
    console.log(error);
    return res.status(400).json({ error_Code: 400 });
  }
};
