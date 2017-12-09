import { Item } from './posts-list.class';


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

  categories: Item[] = [];
  tags: Item[] = [];


  constructor(raw?: any) {
    if (raw) {
      for (const key of Object.getOwnPropertyNames(this)) {
        if (raw.hasOwnProperty(key)) {
          if (key === 'categories' || key === 'tags') {
            Object.assign(this, { [ key ]: raw[ key ].map((one: any) => new Item(one)) });
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
      for (const key of Object.getOwnPropertyNames(this)) {
        if (raw.hasOwnProperty(key)) {
          Object.assign(this, { [ key ]: raw[ key ] });
        }
      }
    }
  }
}
