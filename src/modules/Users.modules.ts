import mongoose, { HydratedDocument } from "mongoose";
import { EUserRole, IUserProfile } from "../models";

type IUserRole = "admin" | "manager" | "customer" | "collaborators";
interface IUser {
  username: string;
  password: string;
  role: IUserRole;
  profile: IUserProfile;
  create_at: Date;
  lock: boolean;
  locked_at: Date | null;
}

const _userSchema = new mongoose.Schema<IUser>({
  username: { type: String, required: true },
  password: { type: String, required: true },
  role: { type: String, enum: EUserRole, default: EUserRole.Customer },
  profile: {
    name: { type: String },
    birthday: { type: String }, // String Date format DD/MM/YYYY
    phone: { type: String, maxlength: 10 },
    address: { type: String },
    identify_code: { type: String },
    identify_address: { type: String },
    last_update: Date,
  },
  create_at: { type: Date, default: Date.now },
  lock: { type: Boolean, default: false },
  locked_at: { type: Date, default: null },
});

export const userModel = mongoose.model<IUser>("User", _userSchema);

// create
export const signUpNewUser = async (value: Record<string, any>) => {
  const newUser: HydratedDocument<IUser> = new userModel({
    username: value.username,
    password: value.password,
    profile: {
      name: null,
      birthday: null,
      phone: null,
      address: null,
      identify_code: null,
      identify_address: null,
      last_update: Date.now(),
    },
    role: value.role,
    create_at: Date.now(),
  });
  await newUser.save()?.catch(err => {
    console.log("🚀 ~ err:", err);
  });
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
