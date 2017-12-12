import Vue from 'vue';
import Component from 'vue-class-component';
import { Post } from '@/models/posts-list.class';
import { RootState } from '@/store';
import { AsyncArgs } from '@/interfaces/asyncData.interface';
import { Should_Pagination, Fetch_Archives_Posts_List, Time_Line_List } from '@/store/types';
import { TimeLine } from 'src/store/modules/archives.module';

@Component({
  name: 'archives-page'
})
export default class ArchivesPage extends Vue {
  get timeLines(): TimeLine {
    return this.$store.getters[ `archives/${Time_Line_List}` ];
  }

  get pagination() {
    const { pageCount, pageSize, total } = (this.$store.state as RootState).archives.postsList;
    return { pageCount, pageSize, total };
  }

  get page(): number {
    return (this.$store.state as RootState).archives.page;
  }

  get format(): string {
    return (this.$store.state as RootState).meta.hexoConfig.dateTimeFormat.date_format;
  }

  get shouldPage(): boolean {
    return (this.$store.getters[ `meta/${Should_Pagination}` ]);
  }

  async asyncData({ store }: AsyncArgs) {
    const prePage: number = (store.state as RootState).archives.page;
    // avoid double fetch initial data
    if (prePage !== 1) {
      await store.dispatch(`archives/${Fetch_Archives_Posts_List}`, { page: 1 });
    }
  }

  async onPage(page: number) {
    this.$nprogress.start();
    await this.$store.dispatch(`archives/${Fetch_Archives_Posts_List}`, { page });
    if (window) {
      window.scrollTo(0, 0);
    }
    this.$nprogress.done();
  }
}
