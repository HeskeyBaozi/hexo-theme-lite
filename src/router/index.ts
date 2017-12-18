import Vue from 'vue';
import Router from 'vue-router';

Vue.use(Router);


export const router = new Router({
  mode: 'hash',
  routes: [
    {
      path: '/',
      name: 'home-page',
      component: () => import('@/views/pages/home/HomePage.vue')
    },
    {
      path: '/archives',
      name: 'archives-page',
      component: () => import('@/views/pages/archives/ArchivesPage.vue')
    },
    {
      path: '/categories',
      name: 'categories-page',
      component: () => import('@/views/pages/categories/CategoriesPage.vue')
    },
    {
      path: '/tags',
      name: 'tags-page',
      component: () => import('@/views/pages/tags/TagsPage.vue')
    },
    {
      path: '/related/:type/:slug',
      name: 'related-posts-page',
      component: () => import('@/views/pages/related-posts/RelatedPosts.vue')
    },
    {
      path: '/posts/:slug',
      name: 'post-page',
      component: () => import('@/views/pages/detailable/create-detailable').then(m => m.createDetailablePage(false))
    },
    {
      path: '/pages/*',
      name: 'implicit-post-page',
      component: () => import('@/views/pages/detailable/create-detailable').then(m => m.createDetailablePage(true))
    },
    {
      path: '/404',
      name: '404',
      component: () => import('@/views/pages/404/page-404.page.ts')
    },
    {
      path: '/*',
      redirect: { name: '404' }
    }
  ]
});
