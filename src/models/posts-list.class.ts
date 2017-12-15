export class PostsList {
  data: Post[] = [];
  pageCount = 0;
  pageSize = 0;
  total = 0;

  constructor(raw?: any) {
    if (raw) {
      for (const key of Object.keys(this)) {
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
      for (const key of Object.keys(this)) {
        if (raw.hasOwnProperty(key)) {
          if (key === 'postlist') {
            Object.assign(this, { [ key ]: raw[ key ].map((one: any) => new Post(one)) });
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
  content: string | null = null;
  text = '';
  link = '';
  raw: string | null = null;
  photos: string[] = [];
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


export class Category {
  name = '';
  slug = '';
  path = '';
  count = 0;
  parent = '';

  constructor(raw?: any) {
    if (raw) {
      for (const key of Object.keys(this)) {
        if (raw.hasOwnProperty(key)) {
          Object.assign(this, { [ key ]: raw[ key ] });
        }
      }

      if (!(raw instanceof Category)) {
        const splitted = this.slug.split('/');
        this.parent = this.slug.split('/').filter((v, i, a) => i !== a.length - 1).join('/');
      }
    }
  }
}

export class Tag {
  name = '';
  slug = '';
  path = '';
  count = 0;

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
