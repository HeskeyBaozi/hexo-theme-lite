import Vue from 'vue';
import Component from 'vue-class-component';
import { Site } from '@/models/hexo-config.class';
import BlurDiv from '@/views/components/blur-div/blur-div.component.ts';
import { ThemeAvatar } from '@/models/theme-config.class';

@Component({
  name: 'top-header',
  components: { BlurDiv },
  props: {
    avatar: {
      required: true,
      validator: obj => obj instanceof ThemeAvatar
    },
    site: {
      required: true,
      validator: obj => obj instanceof Site
    },
    blur: {
      required: true,
      type: Number
    }
  }
})
export default class TopHeader extends Vue {
  avatar: ThemeAvatar;
  site: Site;
  blur: number;
}
