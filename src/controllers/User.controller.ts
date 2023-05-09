import { getUsers } from "../database";
import express from "express";

const UserController = {
  getAllUsers: async (_req: express.Request, res: express.Response) => {
    try {
      const users = await getUsers();
      return res.status(200).json(users);
    } catch (error) {
      console.log("🚀 ~ error:", error);
      return res.status(400);
    }
  },
};

export default UserController;
