import DetailablePage from '@/views/components/detailable-page/DetailablePage.vue';
import { Context } from '@/interfaces/fetch.interface';
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
        date_format: (state: RootState) => state.meta.hexoConfig.dateTimeFormat.date_format,
        time_format: (state: RootState) => state.meta.hexoConfig.dateTimeFormat.time_format,
        target: (state: RootState) => state.detailable.target
      })
    },
    async fetch({ store, route }: Context) {
      const sourceOrSlug = isImplicit ? route.path.replace(/^\/pages\/?/, '') : route.params.slug;
      await store.dispatch(`detailable/${Fetch_Detailable_Target}`, { isImplicit, sourceOrSlug });
    },
    beforeRouteUpdate: async function (this: any, to, from, next) {
      const { fetch } = this.$options;
      if (fetch) {
        try {
          this.$nprogress.start();
          this.$data.search = '';
          await fetch({ store: this.$store, route: to });
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
          date_format: this.date_format,
          time_format: this.time_format,
          target: this.target
        }
      });
    }
  };
}
