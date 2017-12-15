import Vue from 'vue';
import { AsyncArgs } from '@/interfaces/asyncData.interface';
import { RootState } from '@/store';
import { mapState } from 'vuex';
import { CreateElement } from 'vue/types/vue';
import DetailablePage from '@/views/components/detailable-page/DetailablePage.vue';
import NotFound from '@/views/components/404/NotFound.vue';

export default Vue.extend({
  name: 'page-404',
  computed: {
    ...mapState({
      enable: (state: RootState) => state.meta.hexoConfig.theme.page_404.enable,
      format: (state: RootState) => state.meta.hexoConfig.dateTimeFormat.date_format,
      target: (state: RootState) => state.detailable.target
    })
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
});
