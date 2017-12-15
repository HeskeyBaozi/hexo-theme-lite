declare const window: Window;

export default {
  name: 'end-of-file',
  methods: {
    scroll() {
      if (window) {
        window.scrollTo(0, 0);
      }
    }
  }
};
