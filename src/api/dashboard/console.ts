import { http } from '@/utils/http/axios';

//Get console information
export function getConsoleInfo() {
  return http.request({
    url: '/dashboard/console',
    method: 'get',
  });
}
