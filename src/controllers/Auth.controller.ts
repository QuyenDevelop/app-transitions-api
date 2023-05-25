import * as argon from "argon2";
import express from "express";
import jwt from "jsonwebtoken";

import { env } from "../config";
import { findUsers, signUpNewUser } from "../modules/Users.modules";
import { EUserRole } from "../models";

const AuthController = {
  register: async (req: express.Request, res: express.Response) => {
    try {
      const { username, password, role } = req.body;
      // ---- check body request
      const exitingUser = await findUsers(username);
      if (exitingUser) {
        return res.status(403).json({
          success: false,
          errorMessage: "Username already used!!",
        });
      }

      // ---- create new user into database and hash password
      const hashPassword = await argon.hash(password);
      const account = await signUpNewUser({
        username: username,
        password: hashPassword,
        role: role || EUserRole.Customer,
      });

      // ---- return token
      const accessToken = jwt.sign({ userId: account._id }, env.TOKEN_SECRET);
      return res
        .json({
          success: true,
          accessToken,
          data: account,
        })
        .end();
    } catch (error) {
      return res.status(500).json({
        success: false,
        errorMessage: "Internal Server Error!!",
      });
    }
  },
  login: async (req: express.Request, res: express.Response) => {
    try {
      const { username, password } = req.body;
      // ---- check body request
      const exitingUser = await findUsers(username);
      if (!exitingUser) {
        return res.status(403).json({
          success: false,
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
        {
          userId: exitingUser._id,
          role: exitingUser.role,
        },
        env.TOKEN_SECRET
      );
      return res
        .json({
          success: true,
          error_message: "",
          accessToken,
        })
        .end();
    } catch (error) {
      return res.status(500).json({
        success: false,
        errorMessage: "Internal Server Error!!",
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
