import { ActionTree, Module, MutationTree } from 'vuex';
import { HexoConfig } from '@/models/hexo-config.class';
import { fetchHexoConfig } from '@/api';
import { Fetch_Meta, Reload_Meta } from '../types';

export class MetaState {
  hexoConfig = new HexoConfig();
}

const state = {
  hexoConfig: new HexoConfig()
};


const actions: ActionTree<MetaState, any> = {
  async [ Fetch_Meta ]({ commit }) {
    const { data } = await fetchHexoConfig();
    commit(Reload_Meta, data);
  }
};
const mutations: MutationTree<MetaState> = {
  [ Reload_Meta ](state, data) {
    state.hexoConfig = new HexoConfig(data);
  }
};
const getters = {};


export class MetaModule implements Module<MetaState, any> {
  namespaced = true;
  state = state;
  actions = actions;
  mutations = mutations;
  getters = getters;
}
