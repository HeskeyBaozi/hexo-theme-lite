import { Tag, SpecificPostsList } from '@/models/posts-list.class';
import { ActionTree, MutationTree, GetterTree, Module } from 'vuex';
import { RootState } from '@/store';
import { Fetch_Tags, Set_Tags, Fetch_Related_Posts_Of_Tag, Set_Related_Posts_Of_Tag } from '@/store/types';
import { fetchAllTags, fetchPostsListByTag } from '@/api';


export class TagsState {
  tags: Tag[] = [];
  oneTagPosts: SpecificPostsList = new SpecificPostsList();
}

const state = (): TagsState => ({
  tags: [],
  oneTagPosts: new SpecificPostsList()
});

const actions: ActionTree<TagsState, RootState> = {
  async [ Fetch_Tags ]({ commit }) {
    const { data } = await fetchAllTags();
    commit(Set_Tags, { data });
  },
  async [ Fetch_Related_Posts_Of_Tag ]({ commit }, { slug }) {
    const { data } = await fetchPostsListByTag(slug);
    commit(Set_Related_Posts_Of_Tag, { data });
  }
};

const mutations: MutationTree<TagsState> = {
  [ Set_Tags ](state, { data }) {
    state.tags = (data as any[]).map(one => new Tag(one));
  },
  [ Set_Related_Posts_Of_Tag ](state, { data }) {
    state.oneTagPosts = new SpecificPostsList(data);
  }
};

const getters: GetterTree<TagsState, RootState> = {

};

export class TagsModule implements Module<TagsState, RootState> {
  namespaced = true;
  state = state;
  actions = actions;
  mutations = mutations;
  getters = getters;
}
