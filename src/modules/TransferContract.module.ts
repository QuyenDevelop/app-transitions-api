import { IContract } from "../models";
import mongoose from "mongoose";

interface ITransferContract extends IContract {
  transfer_contract_id: string;
  hire_contract_id: string;
  duration: number; // thời hạn
}

const TransferContractSchema = new mongoose.Schema<ITransferContract>({
  transfer_contract_id: { type: String, required: true },
  hire_contract_id: {},
  sa_id: { type: String, required: true },
  leaser_id: { type: String, required: true },
  renter_id: { type: String, required: true },
  prices: { type: Number },
  duration: { type: Number, default: 36 },
  create_at: { type: Date || String, default: Date.now }, // format date DD/MM/YYYY
  status: { type: Boolean, default: true },
});

export const TransferContractModel = mongoose.model<ITransferContract>(
  "Contract",
  TransferContractSchema
);
// ---- create
export const createTransferContract = async (value: Record<string, any>) => {
  const service = await new TransferContractModel(value).save();
  return service.toObject();
};

// ----- read
export const getAllTransferContract = () => TransferContractModel.find();
export const getDetailTransferContract = (sa_id: string) => {
  return TransferContractModel.findOne({ sa_id }).exec();
};

// ----- update
export const updateTransferContract = (
  sa_id: string,
  value: Record<string, any>
) => {
  return TransferContractModel.findOneAndUpdate({ sa_id }, value).exec();
};

// ----- delete
export const deleteTransferContract = (service_id: string) => {
  return TransferContractModel.findByIdAndRemove({ service_id }).exec();
};
