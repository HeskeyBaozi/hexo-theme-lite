import { Category, Tag } from '@/models/posts-list.class';

export class Article {
  title = '';
  slug = '';
  date = '';
  updated = '';
  comments = false;
  path = '';
  photos: string[] = [];
  link = '';
  excerpt: string | null = null;
  covers: string[] | null = null;
  content = '';

  categories: Category[] = [];
  tags: Tag[] = [];


  constructor(raw?: any) {
    if (raw) {
      for (const key of Object.keys(this)) {
        if (raw.hasOwnProperty(key)) {
          if (key === 'categories') {
            Object.assign(this, { [ key ]: raw[ key ].map((one: any) => new Category(one)) });
          } else if (key === 'tags') {
            Object.assign(this, { [ key ]: raw[ key ].map((one: any) => new Tag(one)) });
          } else {
            Object.assign(this, { [ key ]: raw[ key ] });
          }

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
