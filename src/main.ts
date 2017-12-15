import Vue from 'vue';
import App from './App.vue';
import ElementUI from 'element-ui';
import { router } from './router';
import { store } from './store';
import Component from 'vue-class-component';
import axios from 'axios';
import moment from 'moment';
import NProgress from 'nprogress';



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
  render: h => h(App)
});

export { app, router, store };
