import Component from 'vue-class-component';
import TopNav from '../components/top-nav/TopNav.vue';
import { AsyncArgs } from '@/interfaces/asyncData.interface';
import { Fetch_Meta } from '@/store/types';
import Vue from 'vue';
import { Theme } from '@/models/hexo-config.class';
import { MetaState } from '@/store/modules/global';

@Component({
  name: 'app-layout',
  components: { TopNav },
  // directives: {
  //   image: {
  //     bind(el: HTMLElement, binding: { value: { [key: string]: string } }) {
  //       el.style.background = `url('${binding.value.url}') no-repeat fixed`;
  //       el.style.backgroundSize = binding.value.cssSize || 'cover';
  //       el.style.backgroundPosition = binding.value.cssPosition || '50% -50px';
  //     }
  //   }
  // }
})
export default class AppLayout extends Vue {
  get theme(): Theme {
    return (this.$store.state.meta as MetaState).hexoConfig.theme;
  }

  asyncData({ store }: AsyncArgs) {
    return store.dispatch(`meta/${Fetch_Meta}`);
  }

  beforeMount() {
    document.body.style
  }
}
