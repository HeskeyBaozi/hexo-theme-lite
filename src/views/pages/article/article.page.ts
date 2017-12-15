import Vue from 'vue';
import Component from 'vue-class-component';
import { AsyncArgs } from '@/interfaces/asyncData.interface';

@Component({
  name: 'article-page'
})
export default class ArticlePage extends Vue {
  async asyncData({ store, route }: AsyncArgs) {

  }
}
