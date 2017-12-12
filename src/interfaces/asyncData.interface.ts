import { Route } from 'vue-router';
import { Store } from 'vuex';
import Vue from 'vue';

export abstract class AsyncDataComponent extends Vue {
  abstract asyncData(args: AsyncArgs): Promise<any>;
}

export interface AsyncArgs {
  store: Store<any>;
  route: Route;
}
