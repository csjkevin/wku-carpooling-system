import { OrderForm } from '@/interfaces';
import { request } from 'umi';

export async function getAllOrders() {
  return request('/api/orders', {
    method: 'GET',
  });
}

export async function createOrder(options?: { data?: OrderForm }) {
  return request('/api/orders', {
    method: 'POST',
    data: options?.data,
  });
}
