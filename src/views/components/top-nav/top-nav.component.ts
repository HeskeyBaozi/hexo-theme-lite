import Vue from 'vue';
import Component from 'vue-class-component';
import BlurDiv from '@/views/components/blur-div/blur-div.component.ts';
import { ThemeBackground } from '@/models/hexo-config.class';


@Component({
  name: 'top-nav',
  components: { BlurDiv },
  props: {
    background: {
      required: true,
      validator: obj => obj instanceof ThemeBackground
    },
    menu: {
      required: true
    },
    icons: {
      required: true
    }
  }
})
export default class TopNav extends Vue {
  config: ThemeBackground;
  menu: { [ key: string ]: string };
  icons: { [ key: string ]: string | boolean };

  get navItems() {
    return Object.keys(this.menu)
      .map(key => ({
        name: key,
        path: this.menu[ key ],
        icon: this.icons[ key ]
      }));
  }

  routeTo(path: string) {
    this.$router.push({ path });
  }
}
