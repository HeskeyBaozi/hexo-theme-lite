import { Category, SpecificPostsList } from '@/models/posts-list.class';
import { ActionTree, MutationTree, GetterTree, Module } from 'vuex';
import { RootState } from '@/store';
import { Fetch_Categories, Set_Categories, Fetch_Related_Posts_Of_Category, Set_Related_Posts_Of_Category, Categories_Tree } from '@/store/types';
import { fetchAllCategories, fetchPostsListByCategory } from '@/api';

export class CategoriesState {
  categories: Category[] = [];
  oneCategoryPosts: SpecificPostsList = new SpecificPostsList();
}

const state = (): CategoriesState => ({
  categories: [],
  oneCategoryPosts: new SpecificPostsList()
});

const actions: ActionTree<CategoriesState, RootState> = {
  async [ Fetch_Categories ]({ commit }) {
    const { data } = await fetchAllCategories();
    commit(Set_Categories, { data });
  },
  async [ Fetch_Related_Posts_Of_Category ]({ commit }, { slug }) {
    const { data } = await fetchPostsListByCategory(slug);
    commit(Set_Related_Posts_Of_Category, { data });
  }
};

const mutations: MutationTree<CategoriesState> = {
  [ Set_Categories ](state, { data }) {
    state.categories = (data as any[]).map(one => new Category(one));
  },
  [ Set_Related_Posts_Of_Category ](state, { data }) {
    state.oneCategoryPosts = new SpecificPostsList(data);
  }
};

const getters: GetterTree<CategoriesState, RootState> = {
  [ Categories_Tree ](state): CategoryTree[] {
    const categories = state.categories;
    const reducer = reducerFactory(categories);
    const getParent = getParentFactory(categories);
    let accumulation = categories.reduce(reducer, {} as CategoriesTree);
    while (Object.keys(accumulation).some(slug => slug.includes('/'))) {
      accumulation = Object.keys(accumulation).map(key => accumulation[ key ]).reduce(reducer, {} as CategoriesTree);
    }
    return Object.keys(accumulation).map(key => accumulation[ key ]);
  }
};

export class CategoryTree extends Category {
  children: CategoryTree[] = [];
  constructor(raw?: any) {
    super(raw);
    if (raw) {
      for (const key of Object.keys(this)) {
        if (raw.hasOwnProperty(key)) {
          Object.assign(this, { [ key ]: raw[ key ] });
        }
      }
    }
  }
}

interface CategoriesTree {
  [ name: string ]: CategoryTree;
}

function getParentFactory(categories: Category[]) {
  return function getParent(parentName: string) {
    return categories.find(({ slug }) => slug === parentName);
  };
}

function reducerFactory(categories: Category[]) {
  const getParent = getParentFactory(categories);
  return function reducer(accumulation: CategoriesTree, item: Category): CategoriesTree {
    if (item.parent.length) {
      const parent = new CategoryTree(getParent(item.parent));
      return {
        ...accumulation,
        [ parent.slug ]: new CategoryTree({
          ...parent,
          children: [
            ...parent.children,
            new CategoryTree(item)
          ]
        })
      } as CategoriesTree;
    } else {
      accumulation[ item.slug ] = new CategoryTree(item);
      return accumulation;
    }
  };
}



export class CategoriesModule implements Module<CategoriesState, RootState> {
  namespaced = true;
  state = state;
  actions = actions;
  mutations = mutations;
  getters = getters;
}
