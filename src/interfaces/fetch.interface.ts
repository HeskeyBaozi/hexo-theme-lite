import { Route } from 'vue-router';
import { Store } from 'vuex';

export interface Context {
  store: Store<any>;
  route: Route;
}
