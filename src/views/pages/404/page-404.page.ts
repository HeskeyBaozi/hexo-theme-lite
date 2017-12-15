import Vue from 'vue';
import { AsyncArgs } from '@/interfaces/asyncData.interface';
import { RootState } from '@/store';
import { mapState } from 'vuex';
import { CreateElement } from 'vue/types/vue';
import DetailablePage from '@/views/components/detailable-page/DetailablePage.vue';
import NotFound from '@/views/components/404/NotFound.vue';
import { Fetch_Detailable_Target } from '@/store/types';
import { ThemeCustom404 } from '@/models/hexo-config.class';

export default Vue.extend({
  name: 'page-404',
  computed: {
    ...mapState({
      enable: (state: RootState) => state.meta.hexoConfig.theme.page_404.enable,
      format: (state: RootState) => state.meta.hexoConfig.dateTimeFormat.date_format,
      target: (state: RootState) => state.detailable.target
    })
  },
  async asyncData({ store, route }: AsyncArgs) {
    const { enable, source_path }: ThemeCustom404 = (store.state as RootState).meta.hexoConfig.theme.page_404;
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
