import Vue from 'vue';
import { ThemeBackground, ThemeBlur } from '@/models/theme-config.class';
import { mapState } from 'vuex';
import { RootState } from '@/store';

export default Vue.extend({
  name: 'blur-div',
  props: {
    blur: {
      required: true,
      type: Number
    }
  },
  computed: {
    ...mapState({
      background: (state: RootState) => state.meta.themeConfig.background,
      blurTarget: (state: RootState) => state.meta.themeConfig.blur
    })
  },
  render(h) {
    const { url, css_size, css_position, enable_picture, background_color } = this.background as ThemeBackground;
    const { blur } = this.$props;
    const { font, background_color: blur_color, hide_overflow } = this.blurTarget as ThemeBlur;

    return h('div', {
      style: {
        position: 'relative',
        zIndex: '1',
        backgroundColor: blur_color,
        color: font.color,
        overflow: hide_overflow ? 'hidden' : '',
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
          background: enable_picture ? `url(${url}) ${css_position} / ${css_size} no-repeat fixed` : '',
          backgroundColor: background_color,
          height: '100%',
          width: '100%'
        }
      })
    ])
  }
});
