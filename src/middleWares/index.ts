import { merge } from "lodash";
import express from "express";

export const isAuthenticated = async (
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

    // merge(req, { identity: user });
    return next();
  } catch (error) {
    return res.status(400).json({ error_code: 400, error_message: error });
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
