import { app, store, router } from './main';
import { Fetch_Meta, Load_Google_Analytics } from '@/store/types';

declare const window: Window;

router.onReady(async () => {
  router.beforeResolve(async (to, from, next) => {
    const matched = router.getMatchedComponents(to);
    const prevMatched = router.getMatchedComponents(from);

    let diffed = false;
    const activated = matched.filter((component, index) => {
      return diffed || (diffed = (prevMatched[index] !== component));
    });

    if (!activated.length) {
      return next();
    }

    try {
      app.$nprogress.start();
      const hooks = activated.map((c: any) => c.fetch || c.options && c.options.fetch).filter(_ => _);
      await Promise.all(hooks.map(hook => hook({ store, route: to })));
      if (window) {
        window.scrollTo(0, 0);
      }
      app.$nprogress.done();
      next();
    } catch (error) {
      app.$nprogress.done(true);
      next(error);
    }
  });

  // base global meta
  await store.dispatch(`meta/${Fetch_Meta}`);

  // google analytics
  await store.dispatch(`meta/${Load_Google_Analytics}`, { router });


  // Fetch initial state
  const initMatched = router.getMatchedComponents(router.currentRoute);
  const asyncDataHooks = initMatched.map((c: any) => c.fetch || c.options && c.options.fetch).filter(_ => _);
  await Promise.all(asyncDataHooks.map(hook => hook({ store, route: router.currentRoute })));

  // Start!
  app.$mount('#app');

});

