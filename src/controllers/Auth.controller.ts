import * as argon from "argon2";
import express from "express";
import jwt from "jsonwebtoken";

import { env } from "../config";
import { EUserRole } from "../models";
import {
  findUsers,
  getUsersById,
  signUpNewUser,
  updateInfoUsers,
} from "../modules/Users.module";
import { Utils } from "../utils";

const AuthController = {
  register: async (req: express.Request, res: express.Response) => {
    try {
      const { phone, password, full_name, role } = req.body;
      // ---- check body request
      const exitingUser = await findUsers(phone);
      if (exitingUser) {
        return res.status(403).json({
          success: false,
          errorCode: "USER_USED!!",
        });
      }

      // ---- create new user into database and hash password
      const hashPassword = await argon.hash(password);
      const account = await signUpNewUser({
        phone: phone,
        full_name: full_name,
        password: hashPassword || "transition",
        role: role || EUserRole.Customer,
      });

      return res
        .json({
          success: true,
          data: account,
        })
        .end();
    } catch (error) {
      return res.status(500).json({
        success: false,
        errorCode: "INTERNAL_SERVER_ERROR",
      });
    }
  },
  login: async (req: express.Request, res: express.Response) => {
    try {
      const { phone, password } = req.body;
      // ---- check body request
      const user = await findUsers(phone);
      if (!user) {
        return res.status(403).json({
          success: false,
          errorCode: "INVALID_ACCOUNT",
        });
      }
      if (user.isLock) {
        return res.status(403).json({
          success: false,
          errorMessage: "ACCOUNT_LOCKED",
        });
      }
      if (!user.isActive) {
        return res.status(403).json({
          success: false,
          errorMessage: "ACCOUNT_NOT_ACTIVE",
        });
      }
      // ---- create new user into database and hash password
      const comparePassword = await argon.verify(user.password, password);
      if (!comparePassword) {
        return res.status(403).json({
          status: 403,
          errorMessage: "WRONG_REQUEST",
        });
      }

      // ---- return token
      const accessToken = jwt.sign(
        { userId: user._id, role: user.role },
        env.TOKEN_SECRET
      );
      const refreshToken = jwt.sign(
        { userId: user._id, role: user.role },
        env.REFRESH_TOKEN_SECRET
      );
      await updateInfoUsers({ phone }, { accessToken, refreshToken });
      return res
        .json({
          success: true,
          errorCode: "",
          accessToken,
        })
        .end();
    } catch (error) {
      return res.status(500).json({
        success: false,
        errorCode: "INTERNAL_SERVER_ERROR",
      });
    }
  },
  logout: async (req: express.Request, res: express.Response) => {
    try {
      const authHeader = req.header("Authorization");
      const token = Utils.decodeAccessToken(authHeader.split(" ")[1]);
      const user = await getUsersById(token.userId);

      await updateInfoUsers({ phone: user.phone }, { accessToken: null });

      // ---- return
      return res
        .json({
          success: true,
          errorCode: "",
          accessToken: null,
        })
        .end();
    } catch (error) {
      return res.status(500).json({
        success: true,
        errorCode: "INTERNAL_SERVER_ERROR",
      });
    }
  },
};
export default AuthController;
