import { http } from '@/utils/http/axios';

/**
 * @description: role list
 */
export function getRoleList() {
  return http.request({
    url: '/role/list',
    method: 'GET',
  });
}
