import Vue from 'vue';
import Component from 'vue-class-component';
import { AsyncArgs } from '@/interfaces/asyncData.interface';
import { Fetch_Categories, Fetch_Related_Posts_Of_Category, Categories_Tree } from '@/store/types';
import { RootState } from '@/store';
import { CategoryTree } from '@/store/modules/categories.module';
import ResizeSensor from '@/views/components/resize-sensor/ResizeSensor.vue';
import ArticleCard from '@/views/components/article-card/ArticleCard.vue';
import { Post } from '@/models/posts-list.class';


@Component({
  name: 'categories-page',
  components: { ResizeSensor, ArticleCard },
  watch: {
    searchValue(val) {
      (this.$refs.tree as any).filter(val);
    },
    $route(route) {
      if (!route.query.slug) {
        this.$data.currentTab = 'categories';
        this.$data.relatedDisabled = true;

      }
    }
  },
  async beforeRouteUpdate(to, from, next) {
    const { asyncData }: any = this.$options;
    if (asyncData) {
      this.$nprogress.start();
      await asyncData({ store: this.$store, route: to });
      this.$nprogress.done();
      next();
      this.$data.relatedDisabled = false;
      this.$data.currentTab = 'related-posts';
    } else {
      next();
    }
  }
})
export default class CategoriesPage extends Vue {
  searchValue = '';
  searchPostValue = '';
  tabPosition = 'left';
  currentTab = 'categories';
  relatedDisabled = true;

  get categoriesTree(): CategoryTree[] {
    return this.$store.getters[ `categories/${Categories_Tree}` ];
  }

  get oneCategoryPosts(): Post[] {
    return (this.$store.state as RootState).categories.oneCategoryPosts.postlist;
  }

  get displayPosts(): Post[] {
    return this.oneCategoryPosts.filter(post => post.title.indexOf(this.$data.searchPostValue) !== -1);
  }

  get format(): string {
    return (this.$store.state as RootState).meta.hexoConfig.dateTimeFormat.date_format;
  }

  get treeProps() {
    return {
      label: 'name',
      isLeaf: (data: CategoryTree | CategoryTree[]) => !Array.isArray(data) && !data.children.length
    };
  }

  async asyncData({ store, route }: AsyncArgs) {
    console.log('async Cate');
    await store.dispatch(`categories/${Fetch_Categories}`);
    if (route.query.slug) {
      await store.dispatch(`categories/${Fetch_Related_Posts_Of_Category}`, { slug: route.query.slug });
    }
  }

  nodeClick(data: CategoryTree) {
    this.searchPostValue = '';
    this.$router.push({ name: 'categories-page', query: { slug: data.slug } });
  }

  filter(search: string, data: CategoryTree) {
    if (!search) return true;
    return data.name.indexOf(search) !== -1;
  }

  renderContent(h: Function, { data }: { data: CategoryTree }) {
    const searchValue = this.$data.searchValue;
    const name: string = data.name;
    const index = name.indexOf(searchValue);
    const before = name.substr(0, index);
    const after = name.substr(index + searchValue.length);
    const content = index !== -1 ? [
      before,
      h('span', { style: { fontWeight: 'bolder', fontSize: '1.1em' } }, [ searchValue ]),
      after
    ] : [ name ];
    return h('span', {}, content);
  }

  resize({ width, height }: { width: number, height: number }) {
    this.$data.tabPosition = width < 768 ? 'top' : 'left';
  }
}
