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
