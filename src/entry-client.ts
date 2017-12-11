import NProgress from 'nprogress';
import { app, store, router } from './main';

// todo: Vue mixin Route Update

router.onReady(async () => {
  router.beforeResolve(async (to, from, next) => {
    const matched = router.getMatchedComponents(to);
    const prevMatched = router.getMatchedComponents(from);

    let diffed = false;
    const activated = matched.filter((component, index) => {
      return diffed || (diffed = (prevMatched[ index ] !== component));
    });

    if (!activated.length) {
      return next();
    }

    try {
      NProgress.start();
      await Promise.all(activated.map((c: any) => c.asyncData || c.options.asyncData).filter(_ => _));
      NProgress.done();
      next();
    } catch (error) {
      next(error);
    }
  });

  // Fetch initial state
  const initMatched = router.getMatchedComponents(router.currentRoute);
  const asyncDataHooks = initMatched.map((c: any) => c.asyncData || c.options.asyncData).filter(_ => _);
  await Promise.all(asyncDataHooks.map(hook => hook({ store, route: router.currentRoute })));

  // Start!
  app.$mount('#app');

});


