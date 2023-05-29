import express from "express";
import { CONSTANT } from "../config/Constant";
import {
  deleteAllUser,
  deleteOneUser,
  getAllUsers,
  getUsersById,
  updateUsersById,
} from "../modules";
import { Utils } from "../utils";

const UserController = {
  getAllUsers: async (_req: express.Request, res: express.Response) => {
    try {
      const users = await getAllUsers();
      return res.status(200).json(users);
    } catch (error) {
      return res.status(400).json({
        success: false,
        errorCode: CONSTANT.INTERNAL_SERVICE_ERROR,
      });
    }
  },
  getUserInfo: async (req: express.Request, res: express.Response) => {
    try {
      const authHeader = req.header("Authorization");
      const token = Utils.decodeAccessToken(authHeader.split(" ")[1]);
      const user = await getUsersById(token.userId);
      return res.status(200).json({
        success: true,
        errorCode: "",
        data: {
          full_name: user.full_name,
          phone: user.phone,
          birthday: user.birthday,
          address: user.address,
          role: user.role,
          isActive: user.isActive,
          isLock: user.isLock,
          identify_code: user.identify_code,
          identify_address: user.identify_address,
        },
      });
    } catch (error) {
      return res.status(400).json({
        success: false,
        errorCode: CONSTANT.INTERNAL_SERVICE_ERROR,
      });
    }
  },
  deleteOneUser: async (req: express.Request, res: express.Response) => {
    try {
      const authHeader = req.header("Authorization");
      const token = Utils.decodeAccessToken(authHeader.split(" ")[1]);

      await deleteOneUser(token.userId);
      return res.status(200).json({
        success: true,
        errorCode: "",
        data: null,
      });
    } catch (error) {
      return res.status(400).json({
        success: false,
        errorCode: CONSTANT.INTERNAL_SERVICE_ERROR,
        data: null,
      });
    }
  },
  deleteAllUser: async (_req: express.Request, res: express.Response) => {
    try {
      await deleteAllUser();
      return res.status(200).json({
        success: true,
        errorCode: "",
      });
    } catch (error) {
      return res.status(400).json({
        success: false,
        errorCode: CONSTANT.INTERNAL_SERVICE_ERROR,
      });
    }
  },
  activeUser: async (req: express.Request, res: express.Response) => {
    try {
      const id = req.body.id;
      // const user = await getUsersById(id);
      // if (!user)
      //   return res.status(403).json({
      //     success: false,
      //     errorCode: "Can not find user!",
      //   });
      await updateUsersById(id, {
        isActive: true,
      });

      return res.status(200).json({
        success: true,
        errorCode: "",
      });
    } catch (error) {
      return res.status(500).json({
        success: false,
        errorCode: CONSTANT.INTERNAL_SERVICE_ERROR,
      });
    }
  },
  lockedUser: async (req: express.Request, res: express.Response) => {
    try {
      const id = req.body.id;
      if (!id)
        return res.status(401).json({
          success: false,
          errorCode: "Bad request!",
        });
      const user = await getUsersById(id);
      if (!user)
        return res.status(403).json({
          success: false,
          errorCode: "Can not find user!",
        });
      await updateUsersById(id, {
        lock: true,
        locked_at: Date.now(),
      });

      return res.status(200).json({
        success: true,
        errorCode: "",
      });
    } catch (error) {
      return res.status(500).json({
        success: false,
        errorCode: "Internal Server Error!!",
      });
    }
  },
  unlockedUser: async (req: express.Request, res: express.Response) => {
    try {
      const id = req.body.id;
      const user = await getUsersById(id);
      if (!user)
        return res.status(403).json({
          success: false,
          errorCode: "Can not find user!",
        });

      await updateUsersById(id, {
        lock: false,
        locked_at: null,
      });

      return res.status(200).json({
        success: true,
        errorCode: "",
      });
    } catch (error) {
      return res.status(500).json({
        success: false,
        errorCode: CONSTANT.INTERNAL_SERVICE_ERROR,
      });
    }
  },
  updateUserInfo: async (req: express.Request, res: express.Response) => {
    try {
      const authHeader = req.header("Authorization");
      const token = Utils.decodeAccessToken(authHeader.split(" ")[1]);

      await updateUsersById(token.userId, {
        ...req.body,
        last_update: Date.now(),
      });

      return res.status(200).json({
        success: true,
        errorCode: "",
        data: null,
      });
    } catch (error) {
      return res.status(500).json({
        success: false,
        errorCode: CONSTANT.INTERNAL_SERVICE_ERROR,
        data: null,
      });
    }
  },
};

export default UserController;
