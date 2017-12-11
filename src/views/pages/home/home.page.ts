import Vue from 'vue';
import Component from 'vue-class-component';
import { AsyncArgs } from '@/interfaces/asyncData.interface';
import { Fetch_Home_Posts_List, Should_Pagination } from '@/store/types';
import ArticleCard from '@/views/components/article-card/ArticleCard.vue';
import { HomeState } from '@/store/modules/home.module';
import { Post } from '@/models/posts-list.class';
import { MetaState } from '@/store/modules/global';

@Component({
  name: 'home-page',
  components: { ArticleCard }
})
export default class HomePage extends Vue {
  get posts(): Post[] {
    return (this.$store.state.home as HomeState).postsList.data;
  }

  get page(): number {
    return (this.$store.state.home as HomeState).page;
  }

  get format(): string {
    return (this.$store.state.meta as MetaState).hexoConfig.dateTimeFormat.date_format;
  }

  get shouldPage(): boolean {
    return (this.$store.getters[ `meta/${Should_Pagination}` ]);
  }

  async asyncData({ store }: AsyncArgs) {
    const prePage: number = (store.state.home as HomeState).page;
    // avoid double fetch initial data
    if (prePage !== 1) {
      await store.dispatch(`home/${Fetch_Home_Posts_List}`, { page: 1 });
    }
  }

  async onPage({ page }: { page: number }) {
    await this.$store.dispatch(`home/${Fetch_Home_Posts_List}`, { page });
  }
}
