import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  profile: {
    name: { type: String },
    birthday: { type: Date },
    phone: { type: String },
    address: { type: String },
    identify_code: { type: String },
    identify_address: { type: String },
  },
});

export const userModel = mongoose.model("User", UserSchema);
