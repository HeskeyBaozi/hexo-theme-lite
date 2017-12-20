import Vue from 'vue';
import Component from 'vue-class-component';
import { AsyncArgs } from '@/interfaces/asyncData.interface';
import { Fetch_Meta } from '@/store/types';
import { Site } from '@/models/hexo-config.class';
import VueAnalytics from 'vue-analytics';
import TopNav from '@/views/components/top-nav/TopNav.vue';
import TopHeader from '@/views/components/top-header/TopHeader.vue';
import BottomFooter from '@/views/components/bottom-footer/BottomFooter.vue';
import { RootState } from '@/store';
import { Fetch_Detailable_Target } from '@/store/types';
import { Theme } from '@/models/theme-config.class';

@Component({
  name: 'app-layout',
  components: { TopNav, TopHeader, BottomFooter }
})
export default class AppLayout extends Vue {
  get theme(): Theme {
    return (this.$store.state as RootState).meta.themeConfig;
  }

  get site(): Site {
    return (this.$store.state as RootState).meta.hexoConfig.site;
  }

  get gaussian_radius() {
    return this.theme.blur.gaussian_radius;
  }

  beforeMount() {
    // setting Title
    document.title = this.site.title || 'Hexo - Lite Theme';

    // setting Backgound Picture
    const { url, css_size, css_position, background_color, enable_picture } = this.theme.background;
    if (enable_picture) {
      document.body.style.background = `url(${url}) ${css_position} / ${css_size} no-repeat fixed`;
    }
    document.body.style.backgroundColor = background_color;
  }

  // fetch initial global data
  async asyncData({ store }: AsyncArgs) {
    await store.dispatch(`meta/${Fetch_Meta}`);
    console.log('meta fetched');

    // define 404 page
    const page_404 = (store.state as RootState).meta.themeConfig.page_404;

    if (page_404.enable) {
      const source = page_404.source_path.replace(/\.md$/, '');
      await store.dispatch(`detailable/${Fetch_Detailable_Target}`, { isImplicit: true, sourceOrSlug: source });
    }
  }
}
