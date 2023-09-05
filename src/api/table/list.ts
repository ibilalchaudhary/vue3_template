import { http } from '@/utils/http/axios';

//Get Table
export function getTableList(params) {
  return http.request({
    url: '/table/list',
    method: 'get',
    params,
  });
}
