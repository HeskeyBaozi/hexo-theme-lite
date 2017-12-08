import Vue from 'vue';
import App from './App.vue';
import ElementUI from 'element-ui';
import { router } from './router';
import { store } from './store';
import Component from 'vue-class-component';
import axios from 'axios';

Component.registerHooks([
  'asyncData'
]);

Vue.use(ElementUI, { size: 'small' });

// handle request Error with UI $Message
axios.interceptors.response.use(res => res, err => {
  Vue.nextTick(() => {
    console.log('请求失败');
  });
});

Vue.config.productionTip = false;

const app = new Vue({
  router,
  store,
  render: h => h(App)
});

export { app, router, store };
