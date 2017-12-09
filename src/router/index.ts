import Vue from 'vue';
import Router from 'vue-router';

Vue.use(Router);


export const router = new Router({
  mode: 'hash',
  routes: [
    {
      path: '/',
      component: () => import('@/views/layout/AppLayout.vue'),
      children: [
        {
          path: '',
          redirect: { name: 'home-page' }
        },
        {
          path: 'home',
          name: 'home-page',
          component: () => import('@/views/pages/home/HomePage.vue')
        },
        {
          path: 'archives',
          name: 'archives-page',
          component: () => import('@/views/pages/archives/ArchivesPage.vue')
        },
        {
          path: 'categories',
          name: 'categories-page',
          component: () => import('@/views/pages/categories/CategoriesPage.vue')
        },
        {
          path: 'tags',
          name: 'tags-page',
          component: () => import('@/views/pages/tags/TagsPage.vue')
        },
        {
          path: 'posts/:slug',
          name: 'post-page',
          component: () => import('@/views/pages/article/ArticlePage.vue')
        },
        {
          path: 'pages/:slug',
          name: 'implicit-post-page',
          component: () => import('@/views/pages/article/ArticlePage.vue')
        }
      ]
    }
  ]
});
