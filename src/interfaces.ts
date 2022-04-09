export interface Order {
  id: number;
  fromAddress?: string;
  toAddress?: string;
  departureTime?: string;
  capacity?: number;
  remark?: string;
}

export interface OrderForm {
  fromAddress: string;
  toAddress: string;
  departureTime: string;
  capacity: number;
  remark: string;
}

export interface LoginForm {
  email: string;
  password: string;
}

export interface RegisterForm extends LoginForm {
  passwordConfirm?: string;
}

export interface VerifyParams {
  email: string;
  token: string;
}
