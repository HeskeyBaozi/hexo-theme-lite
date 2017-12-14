import { Post } from '@/models/posts-list.class';

export class Modal {
  isShown = false;
  url = '';
  post: Post = new Post();
}
