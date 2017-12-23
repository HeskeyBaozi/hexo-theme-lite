import NProgress from 'nprogress';
import '@/styles/nprogress.scss';
import { VueConstructor } from 'vue';
import { Vue } from 'vue/types/vue';

declare module 'vue/types/vue' {
  interface Vue {
    $nprogress: NProgressStatic;
  }
}

export const installNProgress = {
  install(Vue: VueConstructor<Vue>) {
    Vue.prototype.$nprogress = NProgress;
  }
};
