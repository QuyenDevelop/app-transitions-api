import mongoose from "mongoose";

const AuthSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true },
});

export const authModel = mongoose.model("accounts", AuthSchema);
export const getUsers = () => authModel.find();
export const findAccount = (username: string) => {
  return authModel.findOne({ username: username });
};
export const createUser = async (value: Record<string, any>) => {
  const account = await new authModel(value).save();
  return account.toObject();
};
export const deleteUser = (email: string) => {
  return authModel.findByIdAndRemove({ email: email });
};
export const updatePassword = (
  email: string,
  value: Record<string, { password: string }>
) => authModel.findOneAndUpdate({ email: email, value: value });
