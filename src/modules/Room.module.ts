import mongoose from "mongoose";

const IRoomSchema = new mongoose.Schema({
  room_id: { type: String, required: true },
  sa_id: {},
  room_name: { type: String },
  prices: { type: Number },
  status: { type: Boolean },
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
export const getDetailRoom = (id: string) => {
  return RoomModel.findOne({ room_id: id }).exec();
};

// ----- update
export const updateRoom = (id: string, value: Record<string, any>) => {
  return RoomModel.findOneAndUpdate({ room_id: id }, value).exec();
};

// ----- delete
export const deleteRoom = (id: string) => {
  return RoomModel.findByIdAndRemove({ room_id: id }).exec();
};
