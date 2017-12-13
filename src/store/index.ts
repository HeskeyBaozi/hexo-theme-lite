import Vuex, { Store } from 'vuex';
import Vue, { ComponentOptions } from 'vue';
import { MetaModule, MetaState } from '@/store/modules/global';
import { HomeModule, HomeState } from '@/store/modules/home.module';
import { ArchivesState, ArchivesModule } from '@/store/modules/archives.module';
import { CategoriesState, CategoriesModule } from '@/store/modules/categories.module';

export class RootState {
  meta = new MetaState();
  home = new HomeState();
  archives = new ArchivesState();
  categories = new CategoriesState();
}


Vue.use(Vuex);
export const store: Store<RootState> = new Vuex.Store<RootState>({
  modules: {
    meta: new MetaModule(),
    home: new HomeModule(),
    archives: new ArchivesModule(),
    categories: new CategoriesModule()
  }
});
