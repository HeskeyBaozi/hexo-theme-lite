import Vue from 'vue';
import { ThemeBackground, ThemeBlur } from '@/models/theme-config.class';
import { mapState } from 'vuex';
import { RootState } from '@/store';
import Color from 'color';

export default Vue.extend({
  name: 'blur-div',
  props: {
    blur: {
      required: true,
      type: Number
    },
    isTopNav: {
      type: Boolean,
      'default': false
    }
  },
  computed: {
    ...mapState({
      background: (state: RootState) => state.meta.themeConfig.background,
      blurTarget: (state: RootState) => state.meta.themeConfig.blur
    })
  },
  render(h) {
    const {
      url, css_size, css_position,
      enable_picture, background_color,
      gradient_color
    } = this.background as ThemeBackground;
    const { blur, isTopNav } = this.$props;
    const { font, background_color: blur_color, hide_overflow, opacity } = this.blurTarget as ThemeBlur;

    const absoluteStyle: any = {
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
    };

    const baseStyle: any = {
      position: 'relative',
      zIndex: '1',
      backgroundColor: blur_color,
      color: font.color,
      overflow: hide_overflow ? 'hidden' : '',
      height: '100%',
      width: '100%'
    };


    if (gradient_color.enable) {
      absoluteStyle.backgroundImage = gradient_color.css_value;
    }

    if (opacity.enable) {
      delete absoluteStyle.filter;
      if (gradient_color.enable) {
        delete absoluteStyle.backgroundColor;
        delete absoluteStyle.backgroundImage;
      }

      let color = baseStyle.backgroundColor;
      const alpha = isTopNav ? opacity.opacity_value * 1.6 : opacity.opacity_value;
      baseStyle.backgroundColor = new Color(color).alpha(alpha).string();
    }

    return h('div', {
      style: baseStyle
    }, [
      this.$slots.default,
      h('div', {
        style: absoluteStyle
      })
    ])
  }
});
