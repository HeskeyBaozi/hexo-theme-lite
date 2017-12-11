import Vue from 'vue';
import Component from 'vue-class-component';
import { AsyncArgs } from '@/interfaces/asyncData.interface';
import { Fetch_Home_Posts_List } from '@/store/types';

@Component({
  name: 'home-page'
})
export default class HomePage extends Vue {
  asyncData({ store }: AsyncArgs): Promise<void> {
    return store.dispatch(`home/${Fetch_Home_Posts_List}`, { page: 1 });
  }
}
