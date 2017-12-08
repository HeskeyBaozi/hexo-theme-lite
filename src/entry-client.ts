import { app, store, router } from './main';

router.onReady(async () => {
  router.beforeResolve(async (to, from, next) => {
    const matched = router.getMatchedComponents(to);
    const prevMatched = router.getMatchedComponents(from);
    console.log(matched);

    let diffed = false;
    const activated = matched.filter((component, index) => {
      return diffed || (diffed = (prevMatched[ index ] !== component));
    });

    if (!activated.length) {
      return next();
    }

    try {
      console.log('loading...');
      await Promise.all(activated.map((c: any) => c.asyncData || c.options.asyncData).filter(_ => _));
      console.log('end loading!');
      next();
    } catch (error) {
      next(error);
    }
  });

  // fetch initial state
  // If you use ServerSide Render,
  // You Don't Need to fetch the initial State in the client side:)
  const initMatched = router.getMatchedComponents(router.currentRoute);
  const asyncDataHooks = initMatched.map((c: any) => c.asyncData || c.options.asyncData).filter(_ => _);
  await Promise.all(asyncDataHooks.map(hook => hook({ store, route: router.currentRoute })));

  // start!
  app.$mount('#app');

});


