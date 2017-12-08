import Vue from 'vue';

export default Vue.extend({
  name: 'blur-div',
  props: {
    url: {
      required: true,
      type: String
    },
    blur: {
      type: Number,
      'default': 5
    },
    cssSize: {
      type: String,
      'default': 'cover'
    },
    cssPosition: {
      type: String,
      'default': '50% -50px'
    }
  },
  render(h) {
    return h('div', {
      style: {
        position: 'relative',
        zIndex: '1',
        backgroundColor: 'rgba(255, 255, 255, 0)',
        overflow: 'hidden',
        height: '100%',
        width: '100%'
      }
    }, [
      this.$slots.default,
      h('div', {
        style: {
          position: 'absolute',
          top: '0',
          left: '0',
          right: '0',
          bottom: '0',
          zIndex: '-1',
          content: `''`,
          filter: `blur(${this.$props.blur}px)`,
          background: `url('${this.$props.url}') no-repeat fixed`,
          backgroundSize: this.$props.cssSize,
          backgroundPosition: this.$props.cssPosition,
          height: '100%',
          width: '100%'
        }
      })
    ])
  }
});
