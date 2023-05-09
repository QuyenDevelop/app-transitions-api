import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
  userName: { type: String, required: true },
  email: { type: String, required: true },
  authentication: {
    password: { type: String, required: true, select: false },
    salt: { type: String, select: false },
    access_token: { type: String, select: false },
  },
});

export const userModel = mongoose.model("User", UserSchema);
export const getUsers = () => userModel.find();
export const getUsersByEmail = (email: string) => userModel.findOne({ email });
export const getUsersByToken = (token: string) =>
  userModel.findOne({
    "authentication.access_token": token,
  });
export const createUser = (value: Record<string, any>) => {
  return new userModel(value).save().then((user: any) => user.toObject());
};

export const deleteUserByEmail = (email: string) =>
  userModel.findByIdAndRemove({ email: email });
export const updateUserByEmail = (email: string, value: Record<string, any>) =>
  userModel.findOneAndUpdate({ email: email, value: value });
