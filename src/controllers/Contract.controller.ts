import * as argon from "argon2";
import express from "express";

import { findUsers, signUpNewUser } from "../modules/Users.module";
import { EUserRole } from "../models";
import { Utils } from "utils";

const ContractController = {
  // ---- hiring contract
  createHireContract: async (req: express.Request, res: express.Response) => {
    try {
      // ---- return
      return res
        .json({
          success: true,
          errorMessage: "",
        })
        .end();
    } catch (error) {
      return res.status(400).json({
        success: true,
        errorMessage: "Internal Server Error!!",
      });
    }
  },
  // ---- for rent contract
  // ---- transfer contract
};
export default ContractController;
