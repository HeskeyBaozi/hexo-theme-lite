import {
  Pagination,
  Dialog,
  Dropdown,
  DropdownMenu,
  DropdownItem,
  Menu,
  MenuItem,
  Input,
  Button,
  Tree,
  Row,
  Col,
  Carousel,
  CarouselItem
} from 'element-ui';

import '@/styles/element-ui-vars.scss';
import { VueConstructor } from 'vue';
import { Vue } from 'vue/types/vue';

function install(Vue: VueConstructor<Vue>, options: { size: string }) {
  Vue.prototype.$ELEMENT = options;

  Vue.use(Pagination);
  Vue.use(Dialog);
  Vue.use(Dropdown);
  Vue.use(DropdownMenu);
  Vue.use(DropdownItem);
  Vue.use(Menu);
  Vue.use(MenuItem);
  Vue.use(Input);
  Vue.use(Button);
  Vue.use(Tree);
  Vue.use(Row);
  Vue.use(Col);
  Vue.use(Carousel);
  Vue.use(CarouselItem);
}

export const installElementUI = { install };
