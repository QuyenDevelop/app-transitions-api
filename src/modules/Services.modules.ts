import mongoose from "mongoose";

const RoomServiceSchema = new mongoose.Schema({
  service_id: { type: "string", required: true },
  service_name: { type: "string", required: true },
  unit: { type: "string" },
  prices: { type: "string" },
  description: { type: "string" },
});

export const RoomServiceModel = mongoose.model("services", RoomServiceSchema);
export const getAllServices = () => RoomServiceModel.find();
export const createServices = async (value: Record<string, any>) => {
  const service = await new RoomServiceModel(value).save();
  return service.toObject();
};
export const updateServices = (
  service_id: string,
  value: Record<string, any>
) => {
  return RoomServiceModel.findOneAndUpdate({ service_id, value });
};
export const deleteServices = (service_id: string) => {
  return RoomServiceModel.findByIdAndRemove({ service_id });
};
