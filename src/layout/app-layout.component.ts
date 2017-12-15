import Vue from 'vue';
import Component from 'vue-class-component';
import { AsyncArgs } from '@/interfaces/asyncData.interface';
import { Fetch_Meta } from '@/store/types';
import { Theme, Site } from '@/models/hexo-config.class';
import { MetaState } from '@/store/modules/global';
import TopNav from '@/views/components/top-nav/TopNav.vue';
import TopHeader from '@/views/components/top-header/TopHeader.vue';
import BottomFooter from '@/views/components/bottom-footer/BottomFooter.vue';
import { RootState } from '@/store';
import { Fetch_Detailable_Target } from '@/store/types';

@Component({
  name: 'app-layout',
  components: { TopNav, TopHeader, BottomFooter }
})
export default class AppLayout extends Vue {
  get theme(): Theme {
    return (this.$store.state.meta as MetaState).hexoConfig.theme;
  }

  get site(): Site {
    return (this.$store.state.meta as MetaState).hexoConfig.site;
  }

  beforeMount() {
    // setting Title
    document.title = this.site.title || 'Hexo - Lite Theme';

    // setting Backgound Picture
    const { url, css_size, css_position } = this.theme.background;
    document.body.style.background = `url(${url}) ${css_position} / ${css_size} no-repeat fixed`;
  }

  // fetch initial global data
  async asyncData({ store }: AsyncArgs) {
    await store.dispatch(`meta/${Fetch_Meta}`);
    console.log('meta fetched');

    // define 404 page
    const { enable, source_path } = (store.state as RootState).meta.hexoConfig.theme.page_404;
    const source = source_path.replace(/\.md$/, '');
    if (enable) {
      await store.dispatch(`detailable/${Fetch_Detailable_Target}`, { isImplicit: true, sourceOrSlug: source });
    }
  }
}
