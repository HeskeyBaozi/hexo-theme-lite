import Vue from 'vue';
import Component from 'vue-class-component';
import ArticleCard from '@/views/components/article-card/ArticleCard.vue';
import { Article, Detailable, Page } from '@/models/article.class';

declare const window: Window;


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

  get lastCategory(): string {
    if (this.target instanceof Article) {
      const len = this.target.categories && this.target.categories.length;
      if (!len) {
        return '';
      } else {
        return this.target.categories[ len - 1 ].slug;
      }
    }
    return '';
  }

  scrollTop() {
    if (window) {
      window.scrollTo(0, 0);
    }
  }
}
