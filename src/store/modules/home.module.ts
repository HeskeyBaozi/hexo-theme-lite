import { ActionTree, MutationTree, Module } from 'vuex';
import { PostsList } from '@/models/posts-list.class';
import { Fetch_Home_Posts_List, Set_Home_Posts_List } from '@/store/types';
import { fetchPostsList } from '@/api';
import { RootState } from '@/store';

export class HomeState {
  postsList = new PostsList();
  page = 0;
}

const state = (): HomeState => ({
  postsList: new PostsList(),
  page: 0
});

const actions: ActionTree<HomeState, RootState> = {
  async [ Fetch_Home_Posts_List ]({ commit }, { page }: { page: number }) {
    const { data } = await fetchPostsList(page);
    commit(Set_Home_Posts_List, { data, page });
  }
};

const mutations: MutationTree<HomeState> = {
  [ Set_Home_Posts_List ](state, { data, page }) {
    state.postsList = new PostsList(data);
    state.page = page;
  }
};

const getters = {};

export class HomeModule implements Module<HomeState, RootState> {
  namespaced = true;
  state = state;
  actions = actions;
  mutations = mutations;
  getters = getters;
}
