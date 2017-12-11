export class PostsList {
  data: Post[] = [];
  pageCount = 0;
  pageSize = 0;
  total = 0;

  constructor(raw?: any) {
    if (raw) {
      for (const key of Object.getOwnPropertyNames(this)) {
        if (raw.hasOwnProperty(key)) {
          if (key === 'data') {
            Object.assign(this, { [ key ]: raw[ key ].map((one: any) => new Post(one)) });
          } else {
            Object.assign(this, { [ key ]: raw[ key ] });
          }
        }
      }
    }
  }
}

export class SpecificPostsList {
  name = '';
  postlist: Post[] = [];

  constructor(raw?: any) {
    if (raw) {
      for (const key of Object.getOwnPropertyNames(this)) {
        if (raw.hasOwnProperty(key)) {
          if (key === 'postlist') {
            Object.assign(this, { [ key ]: raw[ key ].map((one: any) => new Item(one)) });
          } else {
            Object.assign(this, { [ key ]: raw[ key ] });
          }

        }
      }
    }
  }
}



export class Post {
  title = '';
  slug = '';
  date = '';
  updated = '';
  comments = false;
  path = '';
  excerpt: string | null = null;
  keywords: any = null;
  cover = '';
  content = '';
  text = '';
  link = '';
  raw: string | null = null;
  photos: string[] = [];
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

export class Item {
  name = '';
  path = '';

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

export class Category extends Item {
  count = 0;

  constructor(raw?: any) {
    super(raw);
    if (raw) {
      for (const key of Object.getOwnPropertyNames(this)) {
        if (raw.hasOwnProperty(key)) {
          Object.assign(this, { [ key ]: raw[ key ] });
        }
      }
    }
  }
}

export class Tag extends Item {
  count = 0;

  constructor(raw?: any) {
    super(raw);
    if (raw) {
      for (const key of Object.getOwnPropertyNames(this)) {
        if (raw.hasOwnProperty(key)) {
          Object.assign(this, { [ key ]: raw[ key ] });
        }
      }
    }
  }
}
