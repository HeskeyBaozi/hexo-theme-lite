import Vue from 'vue';
import { ThemeBackground } from '@/models/hexo-config.class';

export default Vue.extend({
  name: 'blur-div',
  props: {
    background: {
      required: true,
      validator: (obj: object) => obj instanceof ThemeBackground
    },
    blur: {
      type: Number,
      'default': 5
    }
  },
  render(h) {
    const { url, css_size, css_position } = this.$props.background;
    const { blur } = this.$props;
    return h('div', {
      style: {
        position: 'relative',
        zIndex: '1',
        // backgroundColor: 'rgba(255, 255, 255, 0)',
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
            filter: `blur(${blur}px)`,
            background: `url(${url}) ${css_position} / ${css_size} no-repeat fixed`,
            height: '100%',
            width: '100%'
          }
        })
      ])
  }
});
