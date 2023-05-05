import { createUser, getUsersByEmail } from "../database";
import express from "express";
import { Utils } from "../utils";

const AuthController = {
  register: async (req: express.Request, res: express.Response) => {
    try {
      const { email, password, userName } = req.body;

      // ---- check body request
      const exitingUser = await getUsersByEmail(email);
      if (
        !email || // ---- check email
        !password || // ---- check password
        !userName || // ---- check userName
        !exitingUser // ---- check isValid email
      ) {
        return res.sendStatus(400);
      }

      // ---- create new user into database and Encryption password
      const salt = Utils.random();
      const user = await createUser({
        userName,
        email,
        authentication: {
          salt,
          password: Utils.authentication(salt, password),
        },
      });

      // ---- return user data and status code = 200
      return res.sendStatus(200).json(user).end();
    } catch (error) {
      return res.sendStatus(400);
    }
  },
};
export default AuthController;
