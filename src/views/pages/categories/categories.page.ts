import Vue from 'vue';
import Component from 'vue-class-component';
import { AsyncArgs } from '@/interfaces/asyncData.interface';
import { Fetch_Categories, Fetch_Related_Posts_Of_Category, Categories_Tree } from '@/store/types';
import { RootState } from '@/store';
import { CategoryTree } from '@/store/modules/categories.module';

@Component({
  name: 'categories-page',
  watch: {
    searchValue(val) {
      (this.$refs.tree as any).filter(val);
    }
  }
})
export default class CategoriesPage extends Vue {
  searchValue: string = '';

  get categoriesTree(): CategoryTree[] {
    return this.$store.getters[ `categories/${Categories_Tree}` ];
  }

  get treeProps() {
    return {
      label: 'name',
      isLeaf: (data: CategoryTree | CategoryTree[]) => !Array.isArray(data) && !data.children.length
    };
  }

  async asyncData({ store }: AsyncArgs) {
    await store.dispatch(`categories/${Fetch_Categories}`);
  }

  async nodeClick(data: CategoryTree) {
    console.log(data);
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
      h('span', {
        style: {
          fontWeight: 'bold',
          textDecoration: 'underline'
        }
      }, [ searchValue ]),
      after
    ] : [ name ];
    return h('span', {}, content);
  }
}
