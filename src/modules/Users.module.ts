import mongoose from "mongoose";
import { EUserRole } from "../models";

const _userSchema = new mongoose.Schema({
  phone: { type: String, required: true },
  password: { type: String, required: true },
  role: { type: String, enum: EUserRole, default: EUserRole.Customer },
  create_at: { type: Date, default: Date.now },
  isActive: { type: Boolean, default: false },
  isLock: { type: Boolean, default: false },
  locked_at: { type: Date, default: null },
  access_token: { type: String, default: null },
  refresh_token: { type: String, default: null },
  full_name: { type: String },
  birthday: { type: String }, // String Date format DD/MM/YYYY
  address: {
    address_detail: { type: String },
    province: { type: String },
    district: { type: String },
    ward: { type: String },
  },
  identify_code: { type: String },
  identify_address: { type: String },
  last_update: Date,
});

export const userModel = mongoose.model("User", _userSchema);

// create
export const signUpNewUser = async (value: Record<string, any>) => {
  const newUser = new userModel(value);
  await newUser.save();
  return newUser;
};

// read
export const findUsers = (username: string) => {
  return userModel.findOne({ username: username });
};
export const getUsersById = (id: string) => {
  return userModel.findOne({ _id: id });
};
export const getAllUsers = () => userModel.find();

// update
export const updateInfoUsers = (filter: any, update: any) => {
  return userModel.findOneAndUpdate(filter, update);
};
export const updateUsersById = (id: string, update: any) => {
  return userModel.findOneAndUpdate({ _id: id }, update);
};

// delete
export const deleteOneUser = (id: string) => {
  return userModel.findByIdAndRemove({ _id: id });
};
export const deleteAllUser = () => {
  return userModel.deleteMany({});
};
