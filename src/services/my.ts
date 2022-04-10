import { request } from 'umi';

export async function getMyProfile() {
  return request('/api/my/profile', {
    method: 'GET',
  });
}
