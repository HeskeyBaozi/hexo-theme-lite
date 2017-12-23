import Vue from 'vue';
import Component from 'vue-class-component';
import { Context } from '@/interfaces/fetch.interface';
import { Fetch_Home_Posts_List, Should_Pagination } from '@/store/types';
import ArticleCard from '@/views/components/article-card/ArticleCard.vue';
import { Post } from '@/models/posts-list.class';
import { RootState } from '@/store';
import { Modal } from '@/models/modal.class';

declare const window: Window;

@Component({
  name: 'home-page',
  components: { ArticleCard }
})
export default class HomePage extends Vue {

  modal: Modal = new Modal();

  get posts(): Post[] {
    return (this.$store.state as RootState).home.postsList.data;
  }

  get pagination() {
    const { pageCount, pageSize, total } = (this.$store.state as RootState).home.postsList;
    return { pageCount, pageSize, total };
  }

  get page(): number {
    return (this.$store.state as RootState).home.page;
  }

  get format(): string {
    return (this.$store.state as RootState).meta.hexoConfig.dateTimeFormat.date_format;
  }

  get shouldPage(): boolean {
    return (this.$store.getters[ `meta/${Should_Pagination}` ]);
  }

  async fetch({ store }: Context) {
    const prePage: number = (store.state as RootState).home.page;
    // avoid double fetch initial data
    if (prePage !== 1) {
      await store.dispatch(`home/${Fetch_Home_Posts_List}`, { page: 1 });
    }
  }

  async onPage(page: number) {
    if (this.page === page) {
      return;
    }
    this.$nprogress.start();
    await this.$store.dispatch(`home/${Fetch_Home_Posts_List}`, { page });
    if (window) {
      window.scrollTo(0, 0);
    }
    this.$nprogress.done();
  }

  showPhotoDetail({ url, post }: { url: string, post: Post }) {
    this.$data.modal.post = post;
    this.$data.modal.url = url;
    this.$nextTick(() => {
      this.$data.modal.isShown = true;
    });
  }
}
