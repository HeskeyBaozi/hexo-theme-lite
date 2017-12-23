import Component from 'vue-class-component';

export const registerAsyncDataHook = {
  install() {
    Component.registerHooks([
      'fetch'
    ]);
  }
};
