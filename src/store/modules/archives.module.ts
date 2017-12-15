import { PostsList, Post } from '@/models/posts-list.class';
import { ActionTree, MutationTree, GetterTree, Module } from 'vuex';
import { RootState } from '@/store';
import { Fetch_Archives_Posts_List, Set_Archives_Posts_List, Time_Line_List } from '@/store/types';
import { fetchPostsList } from '@/api';
import moment from 'moment';

interface TimeLineEntities {
  [ key: string ]: Post[];
}

export interface TimeLine {
  keys: string[];
  entities: TimeLineEntities;
}

export class ArchivesState {
  postsList = new PostsList();
  page = 0;
}

const state = (): ArchivesState => ({
  postsList: new PostsList(),
  page: 0
});


const actions: ActionTree<ArchivesState, RootState> = {
  async [ Fetch_Archives_Posts_List ]({ commit }, { page }: { page: number }) {
    const { data } = await fetchPostsList(page);
    commit(Set_Archives_Posts_List, { data, page });
  }
};

const mutations: MutationTree<ArchivesState> = {
  [ Set_Archives_Posts_List ](state, { data, page }) {
    state.postsList = new PostsList(data);
    state.page = page;
  }
};

const getters: GetterTree<ArchivesState, RootState> = {
  [ Time_Line_List ](state): TimeLine {
    const result: TimeLineEntities = {};
    for (const post of state.postsList.data) {
      const date = moment(post.date);
      const yearAndMonth = `${date.year()}-${date.month() + 1}`;
      if (result[ yearAndMonth ]) {
        result[ yearAndMonth ].push(post);
      } else {
        result[ yearAndMonth ] = [ post ];
      }
    }
    return { keys: Object.keys(result), entities: result };
  }
};

export class ArchivesModule implements Module<ArchivesState, RootState> {
  namespaced = true;
  state = state;
  actions = actions;
  mutations = mutations;
  getters = getters;
}
