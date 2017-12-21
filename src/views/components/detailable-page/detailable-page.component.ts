import Vue from 'vue';
import Component from 'vue-class-component';
import ArticleCard from '@/views/components/article-card/ArticleCard.vue';
import DetailableContent from '@/views/components/detailable-content/DetailableContent.vue';
import GitmentComment from '@/views/components/gitment-comment/GitmentComment.vue';
import EndOfFile from '@/views/components/eof/EndOfFile.vue';
import { Article, Detailable, Page } from '@/models/article.class';
import { Modal } from '@/models/modal.class';
import { Post } from '@/models/posts-list.class';

declare const window: Window;


@Component({
  name: 'detailable-page',
  components: { ArticleCard, EndOfFile, DetailableContent, GitmentComment },
  props: {
    date_format: {
      required: true,
      type: String
    },
    time_format: {
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

  modal = new Modal();

  get lastCategory(): string {
    if (this.target instanceof Article) {
      const len = this.target.categories && this.target.categories.length;
      if (!len) {
        return '';
      } else {
        return this.target.categories[len - 1].slug;
      }
    }
    return '';
  }

  showPhotoDetail({ url, post }: { url: string, post: Post }) {
    this.$data.modal.post = post;
    this.$data.modal.url = url;
    this.$nextTick(() => {
      this.$data.modal.isShown = true;
    });
  }
}
