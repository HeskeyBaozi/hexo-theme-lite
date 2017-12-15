import Vue from 'vue';
import Component from 'vue-class-component';
import ArticleCard from '@/views/components/article-card/ArticleCard.vue';
import { Article, Detailable, Page } from '@/models/article.class';


@Component({
  name: 'detailable-page',
  components: { ArticleCard },
  props: {
    format: {
      required: true,
      type: String
    },
    target: {
      required: true,
      validator: obj => obj instanceof Article || obj instanceof Page
    },
    isImplicit: {
      required: true,
      type: Boolean
    }
  }
})
export default class DetailablePage extends Vue {
  format: string;
  target: Detailable;
  isImplicit: boolean;
}
