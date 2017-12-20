import { Route } from 'vue-router';
import { Store } from 'vuex';
import Vue from 'vue';
import { VueRouter } from "vue-router/types/router";

export abstract class AsyncDataComponent extends Vue {
  abstract asyncData(args: AsyncArgs): Promise<any>;
}

export interface AsyncArgs {
  store: Store<any>;
  route: Route;
  router?: VueRouter;
}
