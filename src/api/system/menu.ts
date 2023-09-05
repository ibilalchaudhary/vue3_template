import { http } from '@/utils/http/axios';

/**
 * @description: Get user menu based on user id
 */
export function adminMenus() {
  return http.request({
    url: '/menus',
    method: 'GET',
  });
}

/**
 * Get tree menu list
 * @param params
 */
export function getMenuList(params?) {
  return http.request({
    url: '/menu/list',
    method: 'GET',
    params,
  });
}
