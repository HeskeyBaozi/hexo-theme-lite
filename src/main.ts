import Vue from 'vue';
import AppLayout from '@/layout/AppLayout.vue';
import ElementUI from 'element-ui';
import { router } from './router';
import { store } from './store';
import Component from 'vue-class-component';
import moment from 'moment';
import NProgress from 'nprogress';
import '@/styles/import-style';



declare module 'vue/types/vue' {
  interface Vue {
    $nprogress: NProgressStatic;
  }
}

Component.registerHooks([
  'asyncData'
]);

Vue.use(ElementUI, { size: 'small' });
Vue.prototype.$nprogress = NProgress;


Vue.config.productionTip = false;

Vue.filter('format', (value: string, format: string) => {
  if (!value.length) return '';
  return moment(value).format(format);
});

const app = new Vue({
  router,
  store,
  render: h => h(AppLayout)
});

export { app, router, store };
