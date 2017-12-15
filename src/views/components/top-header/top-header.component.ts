import Vue from 'vue';
import Component from 'vue-class-component';
import { Site, ThemeAvatar } from '@/models/hexo-config.class';
import BlurDiv from '@/views/components/blur-div/blur-div.component.ts';
import { ThemeBackground } from '@/models/hexo-config.class';

@Component({
  name: 'top-header',
  components: { BlurDiv },
  props: {
    avatar: {
      required: true,
      validator: obj => obj instanceof ThemeAvatar
    },
    background: {
      required: true,
      validator: (obj: object) => obj instanceof ThemeBackground
    },
    site: {
      required: true,
      validator: obj => obj instanceof Site
    }
  }
})
export default class TopHeader extends Vue {
  avatar: ThemeAvatar;
  background: ThemeBackground;
  site: Site;
}
