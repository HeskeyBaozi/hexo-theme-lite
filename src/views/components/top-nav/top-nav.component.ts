import Vue from 'vue';
import Component from 'vue-class-component';
import BlurDiv from '@/views/components/blur-div/blur-div.component.ts';

@Component({
  name: 'top-nav',
  components: { BlurDiv },
  props: {
    menu: {
      required: true
    },
    icons: {
      required: true
    },
    blur: {
      required: true,
      type: Number
    }
  }
})
export default class TopNav extends Vue {
  menu: { [ key: string ]: string };
  icons: { [ key: string ]: string | boolean };
  blur: number;

  get navItems() {
    return Object.keys(this.menu)
      .map(key => ({
        name: key,
        path: this.menu[key],
        icon: this.icons[key]
      }));
  }

  routeTo(path: string) {
    this.$router.push({ path });
  }
}
