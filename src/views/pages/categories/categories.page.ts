import Vue from 'vue';
import Component from 'vue-class-component';
import { Context } from '@/interfaces/fetch.interface';
import { Fetch_Categories, Categories_Tree } from '@/store/types';
import { CategoryTree } from '@/store/modules/categories.module';
import { CreateElement } from 'vue/types/vue';
import { VNode } from 'vue/types/vnode';


@Component({
  name: 'categories-page',
  watch: {
    search(val) {
      (this.$refs.tree as any).filter(val);
    }
  }
})
export default class CategoriesPage extends Vue {
  search = '';

  get categoriesTree(): CategoryTree[] {
    return this.$store.getters[ `categories/${Categories_Tree}` ];
  }

  get treeProps() {
    return {
      label: 'name',
      isLeaf: (data: CategoryTree | CategoryTree[]) => !Array.isArray(data) && !data.children.length
    };
  }

  async fetch({ store, route }: Context) {
    await store.dispatch(`categories/${Fetch_Categories}`);
  }

  nodeClick(data: CategoryTree) {
    this.$router.push({ name: 'related-posts-page', params: { type: 'category', slug: data.slug } });
  }

  filter(search: string, data: CategoryTree) {
    if (!search) return true;
    return data.name.toLowerCase().indexOf(search.toLowerCase()) !== -1;
  }

  renderContent(h: CreateElement, { data }: { data: CategoryTree }): VNode {
    const search = this.$data.search;
    const name: string = data.name;
    const index = name.toLowerCase().indexOf(search.toLowerCase());
    const before = name.substr(0, index);
    const middle = name.substr(index, search.length);
    const after = name.substr(index + search.length);
    const content = index !== -1 ? [
      before,
      h('span', { style: { fontWeight: 'bolder', fontSize: '1.1em' } }, [ middle ]),
      after
    ] : [ name ];
    return h('span', {}, content);
  }
}
