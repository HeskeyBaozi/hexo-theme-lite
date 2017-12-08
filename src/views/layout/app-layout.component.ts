import Component from 'vue-class-component';
import TopNav from '../components/top-nav/TopNav.vue';
import { AsyncArgs } from '@/interfaces/asyncData.interface';
import { Fetch_Meta } from '@/store/types';
import Vue from 'vue';
import { mapState } from 'vuex';
import { MetaState } from '@/store/modules/global';

@Component({
  name: 'app-layout',
  components: { TopNav },
  computed: {
    ...mapState('meta', {
      theme: (s: MetaState) => s.hexoConfig.theme
    })
  }
})
export default class AppLayout extends Vue {
  asyncData({ store }: AsyncArgs) {
    return store.dispatch(`meta/${Fetch_Meta}`);
  }
}
