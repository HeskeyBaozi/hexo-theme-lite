import Vue from 'vue';
import Component from 'vue-class-component';
import BlurDiv from '@/views/components/blur-div/blur-div.component.ts';


@Component({
  name: 'top-nav',
  components: { BlurDiv },
  props: {
    config: {
      required: true,
      validator: (obj: object) => Object.keys(obj).some(key => key === 'url')
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
  config: { url: string, css_size?: string, css_position?: string };
  menu: { [key: string]: string };
  icons: { [key: string]: string | boolean };

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
