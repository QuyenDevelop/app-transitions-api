export interface responseModal<T> {
  success: boolean;
  errorMessage: string | null;
  data: T | null;
}

export interface IUserProfile {
  name: string;
  birthday: string;
  phone: string;
  address: string;
  identify_code: string;
  identify_address: string;
  last_update?: Date;
}

export interface IAddress {
  address_detail: string;
  province: string;
  district: string;
  ward: string;
}

export interface IContract {
  sa_id: string; // serviced apartment
  leaser_id: string; // người cho thuê (Bên A)
  renter_id: string; // người thuê (Bên B)
  prices: number;
  create_at: Date | string; // format date DD/MM/YYYY
  status: boolean;
}
