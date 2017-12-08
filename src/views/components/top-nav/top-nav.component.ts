import Vue from 'vue';
import Component from 'vue-class-component';
import { Theme } from '@/models/hexo-config.class';
import BlurDiv from '@/views/components/blur-div/blur-div.component.ts';
import { mapState } from 'vuex';
import { MetaState } from '@/store/modules/global';

@Component({
  name: 'top-nav',
  components: { BlurDiv },
  props: {
    theme: {
      required: true,
      validator: (obj: object) => obj instanceof Theme
    }
  },
  computed: {
    ...mapState('meta', {
      bgPicture: (s: MetaState) => s.hexoConfig.theme.background_picture
    })
  }
})
export default class TopNav extends Vue {
  theme: Theme;
  bgPicture: { url: string };

  get navItems() {
    return Object.keys(this.theme.menu)
      .map(key => ({
        name: key,
        path: this.theme.menu[ key ],
        icon: this.theme.menu_icons[ key ]
      }));
  }

  routeTo(path: string) {
    this.$router.push({ path });
  }
}
