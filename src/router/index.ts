import Vue from 'vue';
import Router from 'vue-router';

Vue.use(Router);


export const router = new Router({
  mode: 'hash',
  routes: [
    {
      path: '/',
      component: () => import('../views/layout/AppLayout.vue'),
      children: [
        {
          path: '',
          name: 'app-layout',
          redirect: { name: 'HelloWorld' }
        },
        {
          path: 'home',
          name: 'HelloWorld',
          component: () => import('../views/components/HelloWorld.vue')
        }
      ]
    }
  ]
});
