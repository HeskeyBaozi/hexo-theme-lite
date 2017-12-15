import { Post } from '@/models/posts-list.class';

export interface Detailable {
  title: string;
  date: string;
  updated: string;
  comments: boolean;
  path: string;
  covers: string[] | null;
  excerpt: string | null;
  content: string;
}

export class Article extends Post implements Detailable {
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

export class Page implements Detailable {
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
