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
