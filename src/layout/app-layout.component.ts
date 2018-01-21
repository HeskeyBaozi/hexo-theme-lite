import Vue from 'vue';
import Component from 'vue-class-component';
import { Context } from '@/interfaces/fetch.interface';
import { Fetch_Meta } from '@/store/types';
import { Site } from '@/models/hexo-config.class';
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

  get footerClass() {
    return {
      'app-footer': true,
      'app-dep-footer': this.theme.layout.dependent_footer,
      'container': this.theme.layout.dependent_footer
    };
  }

  get bodyClass() {
    return {
      'app-body': true,
      'container': true,
      'app-dep-footer-body': this.theme.layout.dependent_footer
    }
  }

  beforeMount() {
    // setting Title
    document.title = this.site.title || 'Hexo - Lite Theme';
  }

  mounted() {
    const $app = document.getElementById('app') as HTMLElement;

    // setting Backgound Picture
    const {
      url, css_size,
      css_position,
      background_color,
      enable_picture,
      gradient_color
    } = this.theme.background;
    if (gradient_color.enable) {
      $app.style.backgroundImage = gradient_color.css_value;
    }

    if (enable_picture) {
      $app.style.background = `url(${url}) ${css_position} / ${css_size} no-repeat fixed`;
    }
    $app.style.backgroundColor = background_color;
  }

  // fetch initial global data
  async asyncData({ store }: Context) {
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
