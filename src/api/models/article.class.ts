import { BasePost, Item } from './posts-list.class';


export class Article extends BasePost {
  covers: string[] | null = null;
  content = '';

  constructor(raw?: any) {
    super(raw);
    if (raw) {
      for (const key of Object.getOwnPropertyNames(this)) {
        if (raw.hasOwnProperty(key)) {
          if (key === 'categories' || key === 'tags') {
            Object.assign(this, {[key]: raw[key].map((one: any) => new Item(one))});
          } else {
            Object.assign(this, {[key]: raw[key]});
          }

        }
      }
    }
  }
}
