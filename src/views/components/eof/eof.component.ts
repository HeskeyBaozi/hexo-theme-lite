import Vue from 'vue';

declare const window: Window;

export default Vue.extend({
  name: 'end-of-file',
  methods: {
    scrollTop() {
      if (window) {
        window.scrollTo(0, 0);
      }
    }
  }
})
