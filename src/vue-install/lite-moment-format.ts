import moment from 'moment';
import { VueConstructor } from 'vue';
import { Vue } from 'vue/types/vue';

export const installFormatDirective = {
  install(Vue: VueConstructor<Vue>) {
    Vue.filter('format', (value: string, format: string) => {
      if (!value.length) return '';
      return moment(new Date(value)).format(format);
    });
  }
};
