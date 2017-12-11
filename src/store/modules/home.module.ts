import { ActionTree, MutationTree, Module } from "vuex";
import { PostsList } from "@/models/posts-list.class";
import { Fetch_Home_Posts_List, Set_Home_Posts_List } from "@/store/types";
import { fetchPostsList } from "@/api";

export class HomeState {
    postsList = new PostsList();
}

const state = (): HomeState => ({
    postsList: new PostsList()
});

const actions: ActionTree<HomeState, any> = {
    async [ Fetch_Home_Posts_List ]({ commit }, { page }: { page: number }) {
        const { data } = await fetchPostsList(page);
        commit(Set_Home_Posts_List, data);
    }
};

const mutations: MutationTree<HomeState> = {
    [ Set_Home_Posts_List ](state, rawData) {
        state.postsList = new PostsList(rawData);
    }
}

const getters = {};

export class HomeModule implements Module<HomeState, any> {
    namespaced = true;
    state = state;
    actions = actions;
    mutations = mutations;
    getters = getters;
}
