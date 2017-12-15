import { Detailable, Page, Article } from '@/models/article.class';
import { ActionTree, MutationTree, GetterTree, Module } from 'vuex';
import { RootState } from '@/store';
import { Fetch_Detailable_Target, Set_Detailable_Target } from '@/store/types';
import { fetchImplicitPageBySource, fetchPostBySlug } from '@/api';


export class DetailableState {
  target: Detailable = new Page();
  isImplicit = true;
}

export const state = (): DetailableState => ({
  target: new Page(),
  isImplicit: true
});

export const actions: ActionTree<DetailableState, RootState> = {
  async[ Fetch_Detailable_Target ]({ commit }, { isImplicit, sourceOrSlug }: { isImplicit: boolean, sourceOrSlug: string }) {
    if (isImplicit) {
      try {
        const { data } = await fetchImplicitPageBySource(sourceOrSlug);
        commit(Set_Detailable_Target, { target: data, isImplicit: true });
      } catch (err) {
        const { data } = await fetchImplicitPageBySource(sourceOrSlug.replace(/\/?$/, '/index'));
        commit(Set_Detailable_Target, { target: data, isImplicit: true });
      }

    } else {
      const { data } = await fetchPostBySlug(sourceOrSlug);
      commit(Set_Detailable_Target, { target: data, isImplicit: false });
    }
  }
};

export const mutations: MutationTree<DetailableState> = {
  [ Set_Detailable_Target ](state, { target, isImplicit }) {
    state.target = (isImplicit ? new Page(target) : new Article(target)) as Detailable;
    state.isImplicit = isImplicit;
  }
};

export const getters: GetterTree<DetailableState, RootState> = {

};

export class DetailableModule implements Module<DetailableState, RootState> {
  namespaced = true;
  state = state;
  actions = actions;
  mutations = mutations;
  getters = getters;
}
