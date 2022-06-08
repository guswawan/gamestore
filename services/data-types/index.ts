export interface CategoryTypes {
  _id: string;
  name: string;
  __v: number;
}
export interface GameItemTypes {
  _id: string;
  status: string;
  name: string;
  thumbnail: string;
  category: CategoryTypes;
}
export interface BanksType {
  _id: string;
  accountNumber: number;
  name: string;
  bankName: string;
  __v: number;
}
export interface PaymentType {
  status: string;
  _id: string;
  paymentType: string;
  banks: BanksType[];
}
export interface NominalsType {
  coinQuantity: number;
  price: number;
  _id: string;
  coinName: string;
  __v: number;
}

export interface LoginType {
  email: string;
  password: string;
}

export interface UserTypes {
  id: string;
  username: string;
  name: string;
  email: string;
  avatar: string;
}

export interface JWTPayloadTypes {
  player: UserTypes;
  iat: number;
}

export interface CheckoutTypes {
  voucher: string;
  nominal: string;
  payment: string;
  bank: string;
  name: string;
  accountUser: string;
}
