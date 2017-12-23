import Vue from 'vue';
import { Context } from '@/interfaces/fetch.interface';
import { RootState } from '@/store';
import { mapState } from 'vuex';
import { CreateElement } from 'vue/types/vue';
import DetailablePage from '@/views/components/detailable-page/DetailablePage.vue';
import NotFound from '@/views/components/404/NotFound.vue';
import { Fetch_Detailable_Target } from '@/store/types';
import { ThemeCustom404 } from "@/models/theme-config.class";


export default Vue.extend({
  name: 'page-404',
  computed: {
    ...mapState({
      enable: (state: RootState) => state.meta.themeConfig.page_404.enable,
      date_format: (state: RootState) => state.meta.hexoConfig.dateTimeFormat.date_format,
      time_format: (state: RootState) => state.meta.hexoConfig.dateTimeFormat.time_format,
      target: (state: RootState) => state.detailable.target
    })
  },
  async fetch({ store }: Context) {
    const { enable, source_path }: ThemeCustom404 = (store.state as RootState).meta.themeConfig.page_404;
    if (enable) {
      await store.dispatch(`detailable/${Fetch_Detailable_Target}`, {
        isImplicit: true,
        sourceOrSlug: source_path.replace(/\.md$/, '')
      });
    }
  },
  render(h: CreateElement) {
    return this.enable ? h(DetailablePage, {
      props: {
        isImplicit: true,
        format: this.format,
        target: this.target
      }
    }) : h(NotFound, {});
  }
} as any);
