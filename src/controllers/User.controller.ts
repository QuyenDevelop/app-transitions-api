import express from "express";
import {
  deleteAllUser,
  deleteOneUser,
  getAllUsers,
  getUsersById,
  updateUsersById,
} from "../modules";
import { Utils } from "../utils";
import { IUserProfile, responseModal } from "../models";

const UserController = {
  getAllUsers: async (_req: express.Request, res: express.Response) => {
    try {
      const users = await getAllUsers();
      return res.status(200).json(users);
    } catch (error) {
      return res.status(400).json({
        success: false,
        errorMessage: "Internal Server Error!!",
      });
    }
  },
  getUserInfo: async (req: express.Request, res: express.Response) => {
    try {
      const authHeader = req.header("Authorization");
      const token = Utils.decodeAccessToken(authHeader.split(" ")[1]);
      const users = await getUsersById(token.userId);
      return res.status(200).json({
        success: true,
        errorMessage: "",
        data: users.profile,
      });
    } catch (error) {
      return res.status(400).json({
        success: false,
        errorMessage: "Internal Server Error!!",
      });
    }
  },
  deleteOneUser: async (
    req: express.Request,
    res: express.Response<responseModal<null>>
  ) => {
    try {
      const authHeader = req.header("Authorization");
      const token = Utils.decodeAccessToken(authHeader.split(" ")[1]);

      await deleteOneUser(token.userId);
      return res.status(200).json({
        success: true,
        errorMessage: "",
        data: null,
      });
    } catch (error) {
      return res.status(400).json({
        success: false,
        errorMessage: "Internal Server Error!!",
        data: null,
      });
    }
  },
  deleteAllUser: async (_req: express.Request, res: express.Response) => {
    try {
      await deleteAllUser();
      return res.status(200).json({
        success: true,
        errorMessage: "",
      });
    } catch (error) {
      return res.status(400).json({
        success: false,
        errorMessage: "Internal Server Error!!",
      });
    }
  },
  lockedUser: async (req: express.Request, res: express.Response) => {
    try {
      const id = req.body.id;
      if (!id)
        return res.status(401).json({
          success: false,
          errorMessage: "Bad request!",
        });
      const user = await getUsersById(id);
      if (!user)
        return res.status(401).json({
          success: false,
          errorMessage: "Can not find user!",
        });

      await updateUsersById(id, {
        lock: true,
        locked_at: Date.now(),
      });

      return res.status(200).json({
        success: true,
        errorMessage: "",
      });
    } catch (error) {
      return res.status(400).json({
        success: false,
        errorMessage: "Internal Server Error!!",
      });
    }
  },
  unlockedUser: async (req: express.Request, res: express.Response) => {
    try {
      const id = req.body.id;
      if (!id)
        return res.status(401).json({
          success: false,
          errorMessage: "Bad request!",
        });
      const user = await getUsersById(id);
      if (!user)
        return res.status(401).json({
          success: false,
          errorMessage: "Can not find user!",
        });

      await updateUsersById(id, {
        lock: false,
        locked_at: null,
      });

      return res.status(200).json({
        success: true,
        errorMessage: "",
      });
    } catch (error) {
      return res.status(400).json({
        success: false,
        errorMessage: "Internal Server Error!!",
      });
    }
  },
  updateUserInfo: async (
    req: express.Request<IUserProfile>,
    res: express.Response<responseModal<null>>
  ) => {
    try {
      const authHeader = req.header("Authorization");
      const token = Utils.decodeAccessToken(authHeader.split(" ")[1]);

      await updateUsersById(token.userId, {
        profile: {
          ...req.body,
          last_update: Date.now(),
        },
      });

      return res.status(200).json({
        success: true,
        errorMessage: "",
        data: null,
      });
    } catch (error) {
      return res.status(400).json({
        success: false,
        errorMessage: "Internal Server Error!!",
        data: null,
      });
    }
  },
};

export default UserController;
