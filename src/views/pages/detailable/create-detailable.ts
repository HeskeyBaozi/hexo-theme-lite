import DetailablePage from '@/views/components/detailable-page/DetailablePage.vue';
import { AsyncArgs } from '@/interfaces/asyncData.interface';
import { Fetch_Detailable_Target } from '@/store/types';
import { CreateElement } from 'vue/types/vue';
import { mapState } from 'vuex';
import { RootState } from '@/store';
import { NavigationGuard } from 'vue-router';


export function createDetailablePage(isImplicit: boolean) {
  return {
    name: `${isImplicit ? 'implicit-' : ''}post-page`,
    computed: {
      ...mapState({
        format: (state: RootState) => state.meta.hexoConfig.dateTimeFormat.date_format,
        target: (state: RootState) => state.detailable.target
      })
    },
    async asyncData({ store, route }: AsyncArgs) {
      const sourceOrSlug = isImplicit ? route.path.replace(/^\/pages\/?/, '') : route.params.slug;
      await store.dispatch(`detailable/${Fetch_Detailable_Target}`, { isImplicit, sourceOrSlug });
    },
    beforeRouteUpdate: async function (this: any, to, from, next) {
      const { asyncData } = this.$options;
      if (asyncData) {
        try {
          this.$nprogress.start();
          this.$data.search = '';
          await asyncData({ store: this.$store, route: to });
          this.$nprogress.done();
        } catch (error) {
          next(error);
        }
      } else {
        next();
      }
    } as NavigationGuard,
    render(this: any, h: CreateElement) {
      return h(DetailablePage, {
        props: {
          isImplicit,
          format: this.format,
          target: this.target
        }
      });
    }
  };
}
