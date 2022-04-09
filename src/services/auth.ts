import { LoginForm, RegisterForm, VerifyParams } from '@/interfaces';
import { request } from 'umi';

export async function login(options?: { data?: LoginForm }) {
  return request('/api/login', {
    method: 'POST',
    data: options?.data,
  });
}

export async function register(options?: { data?: RegisterForm }) {
  return request('/api/register', {
    method: 'POST',
    data: options?.data,
  });
}

export async function verify(options?: { params?: VerifyParams }) {
  return request('/api/verify', {
    method: 'GET',
    params: options?.params,
  });
}
