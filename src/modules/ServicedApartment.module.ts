import { IAddress, IUserProfile } from "../models";
import mongoose from "mongoose";

export interface IServicedApartment {
  sa_name: string;
  // ---- người quản lý
  manager: string;
  // ---- chủ sở hữu
  owner: IUserProfile;
  address: IAddress;
  prices: number;
  status: boolean;
  create_at: Date;
  description: string;
}

const ServicedApartmentSchema = new mongoose.Schema<IServicedApartment>({
  sa_name: { type: String, required: true },
  address: {
    address_detail: { type: String },
    province: { type: String },
    district: { type: String },
    ward: { type: String },
  },
  prices: { type: Number },
  status: { type: Boolean, default: true },
  create_at: { type: Date, default: Date.now },
  manager: { type: String },
  owner: {
    name: { type: String },
    birthday: { type: String },
    phone: { type: String },
    address: { type: String },
    identify_code: { type: String },
    identify_address: { type: String },
  },
  description: { type: String },
});

export const ServicedApartmentModel = mongoose.model<IServicedApartment>(
  "Houses",
  ServicedApartmentSchema
);
// ---- create
export const createServicedApartment = async (value: Record<string, any>) => {
  const service = await new ServicedApartmentModel(value).save();
  return service.toObject();
};

// ----- read
export const getAllServicedApartment = () => ServicedApartmentModel.find();
export const getDetailServicedApartment = (id: string) => {
  return ServicedApartmentModel.findOne({ _id: id }).exec();
};

// ----- update
export const updateServicedApartment = (
  id: string,
  value: Record<string, any>
) => {
  return ServicedApartmentModel.findOneAndUpdate({ _id: id }, value).exec();
};

// ----- delete
export const deleteServicedApartment = (id: string) => {
  return ServicedApartmentModel.findByIdAndRemove({ _id: id }).exec();
};
export const deleteAll = () => {
  return ServicedApartmentModel.deleteMany({}).exec();
};
