import { ActionTree, Module, MutationTree, GetterTree } from 'vuex';
import { HexoConfig } from '@/models/hexo-config.class';
import { fetchHexoConfig } from '@/api';
import { Fetch_Meta, Load_Google_Analytics, Reload_Meta, Should_Pagination } from '@/store/types';
import { RootState } from '@/store';
import { Theme } from '@/models/theme-config.class';
import { VueRouter } from 'vue-router/types/router';
import Vue from 'vue';
import { installGoogleAnalytics } from "@/vue-install/lite-analytics";

export class MetaState {
  hexoConfig = new HexoConfig();
  themeConfig = new Theme();
}

const state = (): MetaState => ({
  hexoConfig: new HexoConfig(),
  themeConfig: new Theme()
});


const actions: ActionTree<MetaState, RootState> = {
  async [Fetch_Meta]({ commit }) {
    const { data } = await fetchHexoConfig();
    commit(Reload_Meta, data);
  },
  async [Load_Google_Analytics]({ state }, { router }: { router: VueRouter }) {
    const google_analytics = state.themeConfig.google_analytics;
    if (google_analytics.enable) {
      const track_id = google_analytics.track_id;
      Vue.use(installGoogleAnalytics, { router, track_id });
    }
  }
};
const mutations: MutationTree<MetaState> = {
  [Reload_Meta](state, data) {
    state.hexoConfig = new HexoConfig(data);
    state.themeConfig = new Theme(data);
  }
};
const getters: GetterTree<MetaState, RootState> = {
  [Should_Pagination](state): boolean {
    return state.hexoConfig.page.per_page !== 0;
  }
};


export class MetaModule implements Module<MetaState, RootState> {
  namespaced = true;
  state = state;
  actions = actions;
  mutations = mutations;
  getters = getters;
}
