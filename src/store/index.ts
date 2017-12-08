import Vuex from 'vuex';
import Vue from 'vue';
import { MetaModule } from './modules/global';


Vue.use(Vuex);
export const store = new Vuex.Store({
  modules: {
    meta: new MetaModule()
  }
});
