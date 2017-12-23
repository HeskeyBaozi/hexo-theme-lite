import Vue from 'vue';
import AppLayout from '@/layout/AppLayout.vue';
import { router } from './router';
import { store } from './store';
import '@/styles/import-style';
import { installElementUI } from '@/vue-install/lite-element-ui';
import { installNProgress } from '@/vue-install/lite-nprogress';
import { installFormatDirective } from '@/vue-install/lite-moment-format';
import { registerAsyncDataHook } from '@/vue-install/lite-register-vue-class-component-hook';


Vue.use(registerAsyncDataHook);
Vue.use(installElementUI, { size: 'small' });
Vue.use(installNProgress);
Vue.use(installFormatDirective);
Vue.config.productionTip = false;

const app = new Vue({
  router,
  store,
  render: h => h(AppLayout)
});

export { app, router, store };
