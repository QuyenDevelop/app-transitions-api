import * as argon from "argon2";
import express from "express";
import jwt from "jsonwebtoken";

import { createUser, findAccount } from "../modules";
import { env } from "../config";

const AuthController = {
  register: async (req: express.Request, res: express.Response) => {
    try {
      const { username, password } = req.body;
      // ---- check body request
      const exitingUser = await findAccount(username);
      if (exitingUser) {
        return res.status(403).json({
          status: 403,
          errorMessage: "Username already used!!",
        });
      }

      // ---- create new user into database and hash password
      const hashPassword = await argon.hash(password);
      const account = await createUser({
        username,
        password: hashPassword,
      });

      // ---- return token
      const accessToken = jwt.sign({ userId: account._id }, env.TOKEN_SECRET);
      return res
        .json({
          status: 200,
          error_message: "",
          accessToken,
        })
        .end();
    } catch (_error) {
      return res.status(400).json({
        status: 400,
        errorMessage: "Internal Server Error",
      });
    }
  },
  login: async (req: express.Request, res: express.Response) => {
    try {
      const { username, password } = req.body;
      // ---- check body request
      const exitingUser = await findAccount(username);
      if (!exitingUser) {
        return res.status(403).json({
          status: 403,
          errorMessage: "Incorrect username or password!",
        });
      }

      // ---- create new user into database and hash password
      const comparePassword = await argon.verify(
        exitingUser.password,
        password
      );
      if (!comparePassword) {
        return res.status(403).json({
          status: 403,
          errorMessage: "Incorrect username or password!",
        });
      }

      // ---- return token
      const accessToken = jwt.sign(
        { userId: exitingUser._id },
        env.TOKEN_SECRET
      );
      return res
        .json({
          status: 200,
          error_message: "",
          accessToken,
        })
        .end();
    } catch (error) {
      return res.status(400).json({
        status: 400,
        errorMessage: "Internal Server Error!",
      });
    }
  },
  logout: async (req: express.Request, res: express.Response) => {
    try {
      // ---- return
      return res.json({}).end();
    } catch (error) {
      return res.status(400).json({
        status: 400,
        errorMessage: "Internal Server Error!",
      });
    }
  },
};
export default AuthController;
