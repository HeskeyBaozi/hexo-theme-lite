import Vue from 'vue';
import Component from 'vue-class-component';
import DetailableContent from '@/views/components/detailable-content/DetailableContent.vue';
import EndOfFile from '@/views/components/eof/EndOfFile.vue';
import { Post } from '@/models/posts-list.class';


@Component({
  name: 'article-card',
  props: {
    format: {
      required: true,
      type: String
    },
    post: {
      required: true,
      validator: obj => obj instanceof Post
    },
    showPhotos: {
      required: true,
      type: Boolean
    }
  },
  components: { DetailableContent, EndOfFile }
})
export default class ArticleCard extends Vue {
  format: string;
  post: Post;
  showPhotos: boolean;

  imageWrapperStyles(url: string): object {
    return {
      backgroundImage: `url(${url})`,
      backgroundPosition: 'center',
      backgroundSize: 'cover',
      backgroundRepeat: 'no-repeated'
    } as CSSStyleDeclaration;
  }

  get shouldRenderCover(): boolean {
    const reg = new RegExp(this.post.cover);
    return !reg.test(this.post.excerpt || '');
  }

  get lastCategory(): string {
    const len = this.post.categories.length;
    if (!len) {
      return '';
    } else {
      return this.post.categories[len - 1].slug;
    }
  }
}
