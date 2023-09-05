import { App } from 'vue';

import { permission } from '@/directives/permission';

/**
 * Register a global custom directive
 * @param app
 */
export function setupDirectives(app: App) {
  // Access Control Instructions
  app.directive('permission', permission);
}
