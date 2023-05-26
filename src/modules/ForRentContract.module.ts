import { IContract } from "../models";
import mongoose from "mongoose";

interface IForRentContract extends IContract {
  rent_contract_id: string;
  room_id: string;
  duration: number; // thời hạn
}

const ForRentContractSchema = new mongoose.Schema<IForRentContract>({
  rent_contract_id: { type: String, required: true },
  room_id: { type: String, required: true },
  leaser_id: { type: String, required: true },
  renter_id: { type: String, required: true },
  prices: { type: Number },
  duration: { type: Number, default: 12 },
  create_at: { type: Date || String, default: Date.now }, // format date DD/MM/YYYY
  status: { type: Boolean, default: true },
});

export const ForRentContractModel = mongoose.model<IForRentContract>(
  "Contract",
  ForRentContractSchema
);
// ---- create
export const createForRentContract = async (value: Record<string, any>) => {
  const service = await new ForRentContractModel(value).save();
  return service.toObject();
};

// ----- read
export const getAllForRentContract = () => ForRentContractModel.find();
export const getDetailForRentContract = (sa_id: string) => {
  return ForRentContractModel.findOne({ sa_id }).exec();
};

// ----- update
export const updateForRentContract = (
  sa_id: string,
  value: Record<string, any>
) => {
  return ForRentContractModel.findOneAndUpdate({ sa_id }, value).exec();
};

// ----- delete
export const deleteForRentContract = (service_id: string) => {
  return ForRentContractModel.findByIdAndRemove({ service_id }).exec();
};
