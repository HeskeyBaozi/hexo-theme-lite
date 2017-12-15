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
import '@/styles/theme/base.css';
import '@/styles/theme/Button.css';
import '@/styles/theme/Carousel.css';
import '@/styles/theme/Carousel-Item.css';
import '@/styles/theme/Col.css';
import '@/styles/theme/Dialog.css';
import '@/styles/theme/Dropdown.css';
import '@/styles/theme/element-variables.css';
import '@/styles/theme/Input.css';
import '@/styles/theme/Menu.css';
import '@/styles/theme/Pagination.css';
import '@/styles/theme/Row.css';
import '@/styles/theme/Tree.css';
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
