import Vue from 'vue';
import Component from 'vue-class-component';
import { Context } from '@/interfaces/fetch.interface';
import ArticleCard from '@/views/components/article-card/ArticleCard.vue';
import EndOfFile from '@/views/components/eof/EndOfFile.vue';
import { Fetch_Related_Posts_Of_Category, Fetch_Related_Posts_Of_Tag } from '@/store/types';
import { RootState } from '@/store';
import { Modal } from '@/models/modal.class';
import { Post } from '@/models/posts-list.class';

@Component({
  name: 'related-posts',
  components: { ArticleCard, EndOfFile },
  async beforeRouteUpdate(to, from, next) {
    const { asyncData } = this.$options as any;
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
  }
})
export default class RelatedPosts extends Vue {
  search = '';
  modal: Modal = new Modal();

  get format(): string {
    return (this.$store.state as RootState).meta.hexoConfig.dateTimeFormat.date_format;
  }

  get posts(): Post[] {
    const { type } = this.$route.params;
    const rootState: RootState = this.$store.state;
    if (type === 'category') {
      return rootState.categories.oneCategoryPosts.postlist;
    } else if (type === 'tag') {
      return rootState.tags.oneTagPosts.postlist;
    }
    return [];
  }

  get displayPosts(): Post[] {
    const search = this.$data.search;
    return search.length ? this.posts.filter(post => post.title.toLowerCase().indexOf(search.toLowerCase()) !== -1) : this.posts;
  }

  get shouldShowEOF(): boolean {
    if (this.displayPosts.length) {
      return !!this.displayPosts[ this.displayPosts.length - 1 ].excerpt;
    } else {
      return false;
    }
  }

  async fetch({ store, route }: Context) {
    const { type, slug } = route.params;
    if (type === 'category') {
      await store.dispatch(`categories/${Fetch_Related_Posts_Of_Category}`, { slug });
    } else if (type === 'tag') {
      await store.dispatch(`tags/${Fetch_Related_Posts_Of_Tag}`, { slug });
    }
  }


  showPhotoDetail({ url, post }: { url: string, post: Post }) {
    this.$data.modal.post = post;
    this.$data.modal.url = url;
    this.$nextTick(() => {
      this.$data.modal.isShown = true;
    });
  }

  back() {
    const { type } = this.$route.params;
    if (type === 'category') {
      this.$router.push({ name: 'categories-page' });
    } else if (type === 'tag') {
      this.$router.push({ name: 'tags-page' });
    } else {
      this.$router.go(-1);
    }
  }
}
