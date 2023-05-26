import { IContract } from "../models";
import mongoose from "mongoose";

interface IHireContract extends IContract {
  hire_contract_id: string;
  house_facility: Array<string>;
  // rules: Array<string>;
  duration: number; // thời hạn
}

const HireContractSchema = new mongoose.Schema<IHireContract>({
  hire_contract_id: { type: String, required: true },
  sa_id: { type: String, required: true },
  leaser_id: { type: String, required: true },
  renter_id: { type: String, required: true },
  prices: { type: Number },
  // rules: { type: Number },
  duration: { type: Number, default: 36 },
  create_at: { type: Date || String, default: Date.now }, // format date DD/MM/YYYY
  status: { type: Boolean, default: true },
});

export const HireContractModel = mongoose.model<IHireContract>(
  "Contract",
  HireContractSchema
);
// ---- create
export const createContract = async (value: Record<string, any>) => {
  const service = await new HireContractModel(value).save();
  return service.toObject();
};

// ----- read
export const getAllContract = () => HireContractModel.find();
export const getDetailContract = (sa_id: string) => {
  return HireContractModel.findOne({ sa_id }).exec();
};

// ----- update
export const updateContract = (sa_id: string, value: Record<string, any>) => {
  return HireContractModel.findOneAndUpdate({ sa_id }, value).exec();
};

// ----- delete
export const deleteContract = (service_id: string) => {
  return HireContractModel.findByIdAndRemove({ service_id }).exec();
};
