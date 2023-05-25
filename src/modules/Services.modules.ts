import mongoose from "mongoose";

interface IRoomService {
  service_id: string;
  service_name: string;
  unit: string;
  prices: string;
  description: string;
}

const RoomServiceSchema = new mongoose.Schema<IRoomService>({
  service_id: { type: String, required: true },
  service_name: { type: String, required: true },
  unit: { type: String },
  prices: { type: String },
  description: { type: String },
});

export const RoomServiceModel = mongoose.model<IRoomService>(
  "services",
  RoomServiceSchema
);
// ---- create
export const createServices = async (value: Record<string, any>) => {
  const service = await new RoomServiceModel(value).save();
  return service.toObject();
};

// ----- read
export const getAllServices = () => RoomServiceModel.find();

// ----- update
export const updateServices = (
  service_id: string,
  value: Record<string, any>
) => {
  return RoomServiceModel.findOneAndUpdate({ service_id, value });
};

// ----- delete
export const deleteServices = (service_id: string) => {
  return RoomServiceModel.findByIdAndRemove({ service_id });
};
