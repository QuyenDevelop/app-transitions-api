import { RoomServiceModel } from "../models";

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
