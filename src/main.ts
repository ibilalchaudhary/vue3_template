import './styles/tailwind.css';
import { createApp } from 'vue';
import App from './App.vue';
import router, { setupRouter } from './router';
import { setupStore } from '@/store';
import { setupNaive, setupDirectives } from '@/plugins';
import { AppProvider } from '@/components/Application';

async function bootstrap() {
  const appProvider = createApp(AppProvider);

  const app = createApp(App);

  // Register globally commonly used naive-ui components
  setupNaive(app);

  // Register global custom components
  //setupCustomComponents();

  // Register global custom directives, such as: v-permission permission directive
  setupDirectives(app);

  // Register global methods like: app.config.globalProperties.$message = message
  //setupGlobalMethods(app);

  // Mount state management
  setupStore(app);

  //First mount the Provider to solve the routing guard, which can be used in Axios, Dialog, Message and other components
  appProvider.mount('#appProvider', true);

  // mount route
  await setupRouter(app);

  // Mount the APP instance after the route is ready
  await router.isReady();

  app.mount('#app', true);
}

void bootstrap();
