import Vue from 'vue';
import Component from 'vue-class-component';
import { Post } from '@/models/posts-list.class';
import { CreateElement } from 'vue/types/vue';


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
  }
})
export default class ArticleCard extends Vue {
  format: string;
  post: Post;

  get lastCategory(): string {
    const len = this.post.categories.length;
    if (!len) {
      return '';
    } else {
      return this.post.categories[ len - 1 ].slug;
    }
  }

  get postDescription(): string {
    return `${this.post.excerpt || this.post.text}...`;
  }
}
