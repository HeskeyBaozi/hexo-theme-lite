import Vuex, { Store } from 'vuex';
import Vue, { ComponentOptions } from 'vue';
import { MetaModule, MetaState } from '@/store/modules/global';
import { HomeModule, HomeState } from '@/store/modules/home.module';
import { ArchivesState, ArchivesModule } from '@/store/modules/archives.module';
import { CategoriesState, CategoriesModule } from '@/store/modules/categories.module';
import { TagsState, TagsModule } from '@/store/modules/tag.module';
import { DetailableState, DetailableModule } from '@/store/modules/detailable.module';

Vue.use(Vuex);

export class RootState {
  meta = new MetaState();
  home = new HomeState();
  archives = new ArchivesState();
  categories = new CategoriesState();
  tags = new TagsState();
  detailable = new DetailableState();
}

export const store: Store<RootState> = new Vuex.Store<RootState>({
  modules: {
    meta: new MetaModule(),
    home: new HomeModule(),
    archives: new ArchivesModule(),
    categories: new CategoriesModule(),
    tags: new TagsModule(),
    detailable: new DetailableModule()
  }
});
