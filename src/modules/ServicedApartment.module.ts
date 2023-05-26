import { IAddress } from "../models";
import mongoose from "mongoose";

interface IServicedApartment {
  sa_id: string;
  // ---- người quản lý
  manager: string;
  // ---- chủ sở hữu
  owner: string;
  sa_name: string;
  address: IAddress;
  prices: string;
  status: boolean;
  description: string;
}

const ServicedApartmentSchema = new mongoose.Schema<IServicedApartment>({
  sa_id: { type: String, required: true },
  sa_name: { type: String, required: true },
  address: {
    address_detail: { type: String },
    province: { type: String },
    district: { type: String },
    ward: { type: String },
  },
  prices: { type: String },
  status: { type: Boolean },
  manager: {},
  owner: {},
  description: { type: String },
});

export const ServicedApartmentModel = mongoose.model<IServicedApartment>(
  "ServicedApartment",
  ServicedApartmentSchema
);
// ---- create
export const createServicedApartment = async (value: Record<string, any>) => {
  const service = await new ServicedApartmentModel(value).save();
  return service.toObject();
};

// ----- read
export const getAllServicedApartment = () => ServicedApartmentModel.find();
export const getDetailServicedApartment = (sa_id: string) => {
  return ServicedApartmentModel.findOne({ sa_id }).exec();
};

// ----- update
export const updateServicedApartment = (
  sa_id: string,
  value: Record<string, any>
) => {
  return ServicedApartmentModel.findOneAndUpdate({ sa_id }, value).exec();
};

// ----- delete
export const deleteServicedApartment = (service_id: string) => {
  return ServicedApartmentModel.findByIdAndRemove({ service_id }).exec();
};
