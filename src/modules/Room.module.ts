import { ERoomType } from "../models";
import mongoose from "mongoose";

const IRoomSchema = new mongoose.Schema({
  sa_id: { type: String, required: true },
  room_name: { type: String },
  room_type: { type: String, enum: ERoomType, require: true },
  prices: { type: Number },
  status: { type: Boolean, default: true },
  description: { type: String },
});

export const RoomModel = mongoose.model("Rooms", IRoomSchema);
// ---- create
export const createRoom = async (value: Record<string, any>) => {
  const service = await new RoomModel(value).save();
  return service.toObject();
};

// ----- read
export const getListRoom = () => RoomModel.find();
export const getListRoomByHouseId = (houseId: string) => {
  return RoomModel.find({ sa_id: houseId });
};
export const getDetailRoom = (id: string) => {
  return RoomModel.findOne({ _id: id }).exec();
};

// ----- update
export const updateRoom = (id: string, value: Record<string, any>) => {
  return RoomModel.findOneAndUpdate({ _id: id }, value).exec();
};

// ----- delete
export const deleteRoom = (id: string) => {
  return RoomModel.findByIdAndRemove({ _id: id }).exec();
};
export const deleteAllRoom = () => {
  return RoomModel.deleteMany({}).exec();
};
