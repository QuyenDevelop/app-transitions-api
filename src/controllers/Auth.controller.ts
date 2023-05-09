import { createUser, getUsersByEmail } from "../database";
import express from "express";
import { Utils } from "../utils";

const AuthController = {
  register: async (req: express.Request, res: express.Response) => {
    try {
      const { email, password, userName } = req.body;
      // ---- check body request
      const exitingUser = await getUsersByEmail(email);
      if (!email || !password || !userName) {
        return res.sendStatus(400).send("Password or email is invalid !!");
      }
      if (exitingUser) {
        console.log("🚀 ~ exitingUser User!!");
        return res.sendStatus(403).send("User is already!!");
      }
      // ---- create new user into database and Encryption password
      const salt = Utils.random();
      const user = await createUser({
        userName,
        email,
        authentication: {
          salt: salt,
          password: Utils.authentication(salt, password),
        },
      });
      // ---- return user data and status code = 200
      return res.json(user).end();
    } catch (error) {
      return res.sendStatus(400).send(error);
    }
  },

  login: async (req: express.Request, res: express.Response) => {
    try {
      const { email, password } = req.body;
      const user = await getUsersByEmail(email).select(
        "+authentication.salt +authentication.password"
      );
      // ---- check body request
      if (!email || !password) {
        return res.sendStatus(400);
      }
      // ---- check exitingUser
      if (!user) {
        console.log("🚀 ~ exitingUser User!!");
        return res.sendStatus(403).send("Cant not find User !!");
      }
      // ---- create new user into database and Encryption password
      const passwordReq = Utils.authentication(
        user.authentication.salt,
        password
      );
      if (user.authentication.password !== passwordReq) {
        console.log("🚀 ~ Wrong Password!!");
        return res.sendStatus(403).send("Wrong Password!!");
      }

      // ---- update access_token and cookie
      const salt = Utils.random();
      user.authentication.access_token = Utils.authentication(
        salt,
        user._id.toString()
      );
      await user.save();
      res.cookie("Access_Token", user.authentication.access_token, {
        domain: "localhost",
        path: "/",
      });
      // ---- return
      return res.json(user).end();
    } catch (error) {
      return res.sendStatus(400).send(error);
    }
  },
  logout: async (req: express.Request, res: express.Response) => {
    try {
      // ---- return
      return res.json({}).end();
    } catch (error) {
      return res.sendStatus(400).send(error);
    }
  },
};
export default AuthController;
