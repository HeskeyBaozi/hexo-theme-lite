import { Category, Tag, Post } from '@/models/posts-list.class';

export class Article extends Post {
  covers: string[] | null = null;
  content = '';
  constructor(raw?: any) {
    super(raw);
    if (raw) {
      for (const key of [ 'covers', 'content' ]) {
        if (raw.hasOwnProperty(key)) {
          Object.assign(this, { [ key ]: raw[ key ] });
        }
      }
    }
  }
}

export class Page {
  title = '';
  date = '';
  updated = '';
  comments = false;
  path = '';
  covers: string[] | null = null;
  excerpt: string | null = null;
  content = '';

  constructor(raw?: any) {
    if (raw) {
      for (const key of Object.keys(this)) {
        if (raw.hasOwnProperty(key)) {
          Object.assign(this, { [ key ]: raw[ key ] });
        }
      }
    }
  }
}
