import mongoose from "mongoose";

const RoomServiceSchema = new mongoose.Schema({
  service_id: { type: "string", required: true },
  service_name: { type: "string", required: true },
  unit: { type: "string" },
  prices: { type: "string" },
  description: { type: "string" },
});

export const RoomServiceModel = mongoose.model("services", RoomServiceSchema);
