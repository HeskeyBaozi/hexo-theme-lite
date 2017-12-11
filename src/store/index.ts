import Vuex from 'vuex';
import Vue from 'vue';
import { MetaModule } from '@/store/modules/global';
import { HomeModule } from '@/store/modules/home.module';


Vue.use(Vuex);
export const store = new Vuex.Store({
  modules: {
    meta: new MetaModule(),
    home: new HomeModule()
  }
});
