// https://hexo.io/zh-cn/docs/configuration.html

import { GitmentOptions } from "@/models/comments-system.class";

export class HexoConfig {
  site: Site = new Site();
  url: URL = new URL();
  directory: Directory = new Directory();
  writing: Writing = new Writing();
  categoriesAndTags: CategoryAndTags = new CategoryAndTags();
  dateTimeFormat: DateTimeFormat = new DateTimeFormat();
  page: Pagination = new Pagination();
  extensions: Extensions = new Extensions();
  theme: Theme = new Theme();

  constructor(raw?: any) {
    if (raw) {
      this.site = new Site(raw);
      this.url = new URL(raw);
      this.directory = new Directory(raw);
      this.writing = new Writing(raw);
      this.categoriesAndTags = new CategoryAndTags(raw);
      this.dateTimeFormat = new DateTimeFormat(raw);
      this.page = new Pagination(raw);
      this.extensions = new Extensions(raw);
      this.theme = new Theme(raw[ 'theme_config' ]);
    }
  }
}

export class Site {
  title = ''; // 网站标题
  subtitle = ''; // 网站副标题
  description = ''; // 网站描述
  author = ''; // 您的名字
  language = ''; // 网站使用的语言
  timezone = ''; //网站时区。Hexo 默认使用您电脑的时区。时区列表。比如说：America/New_York, Japan, 和 UTC 。
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

export class URL {
  url = ''; // 网址
  root = ''; // 网站根目录
  permalink = ''; // 文章的 永久链接 格式
  permalink_defaults = ''; // 永久链接中各部分的默认值
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

export class Directory {
  source_dir = ''; // 资源文件夹，这个文件夹用来存放内容。
  public_dir = ''; // 公共文件夹，这个文件夹用于存放生成的站点文件。
  tag_dir = ''; // 标签文件夹
  archive_dir = ''; // 归档文件夹
  category_dir = ''; // 分类文件夹
  code_dir = ''; // Include code 文件夹
  i18n_dir = ''; // 国际化（i18n）文件夹
  skip_render = ''; // 跳过指定文件的渲染，您可使用 glob 表达式来匹配路径。
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

export class Writing {
  new_post_name = ''; // 新文章的文件名称
  default_layout = ''; // 预设布局
  titlecase = false; // 把标题转换为 title case
  filename_case = 0; // 把文件名称转换为 (1) 小写或 (2) 大写
  external_link = ''; // 在新标签中打开链接
  render_drafts = false; // 显示草稿
  post_asset_folder = false; // 启动 Asset 文件夹
  relative_link = false; // 把链接改为与根目录的相对位址
  future = true; // 显示未来的文章
  highlight: {
    enable: boolean,
    line_number: boolean,
    auto_detect: boolean,
    tab_replace: string
  } | null = null; // 代码块的设置
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

export class CategoryAndTags {
  default_category = ''; // 默认分类
  category_map = ''; // 分类别名
  tag_map = ''; // 标签别名
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

export class DateTimeFormat {
  date_format = ''; // 日期格式	YYYY-MM-DD
  time_format = ''; // 时间格式	H:mm:ss
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

export class Pagination {
  per_page = 0; // 每页显示的文章量 (0 = 关闭分页功能)
  pagination_dir = ''; // 分页目录
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

export class Extensions {
  theme: string | boolean = false; // 当前主题名称。值为false时禁用主题
  deploy = {}; // 部署部分的设置
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


export class Theme {
  menu: ThemeMenu = new ThemeMenu();
  menu_icons: {
    [ key: string ]: string | boolean
  } = {
    enable: false
  };
  social = {};
  social_icons = {
    enable: false
  };
  page_404 = new ThemeCustom404();

  avatar: ThemeAvatar = new ThemeAvatar();
  background: ThemeBackground = new ThemeBackground();
  gitment = new GitmentOptions();
  powered_by = '';

  constructor(raw?: any) {
    if (raw) {
      for (const key of Object.keys(this)) {
        if (raw.hasOwnProperty(key)) {
          if (key === 'avatar') {
            Object.assign(this, { [ key ]: new ThemeAvatar(raw[ key ]) });
          } else if (key === 'background') {
            Object.assign(this, { [ key ]: new ThemeBackground(raw[ key ]) });
          } else if (key === 'menu') {
            Object.assign(this, { [ key ]: new ThemeMenu(raw[ key ]) });
          } else if (key === 'page_404') {
            Object.assign(this, { [ key ]: new ThemeCustom404(raw[ key ]) });
          } else if (key === 'gitment') {
            Object.assign(this, { [ key ]: new GitmentOptions(raw[ key ]) });
          } else {
            Object.assign(this, { [ key ]: raw[ key ] });
          }
        }
      }
    }
  }
}

export class ThemeCustom404 {
  enable = false;
  source_path = '';

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

interface LiteMenu {
  Home: string;
  Archives: string;
  Categories?: string;
  Tags?: string;
}

export class ThemeMenu implements LiteMenu {
  Home = '/';
  Archives = '/archives';

  constructor(raw?: { [ key: string ]: string | boolean }) {
    const extract: { [ key: string ]: string } = {
      Home: '/',
      Archives: '/archives',
      Categories: '/categories',
      Tags: '/tags'
    };

    const basicKeys = Object.keys(extract);
    if (raw) {
      for (const basicKey of basicKeys) {
        if (typeof raw[ basicKey ] === 'boolean' && raw[ basicKey ]) {
          Object.assign(this, { [ basicKey ]: extract[ basicKey ] });
        }
      }

      for (const otherKey of Object.keys(raw)) {
        if (basicKeys.every(basicKey => otherKey !== basicKey)) {
          Object.assign(this, { [ otherKey ]: raw[ otherKey ] });
        }
      }
    }
  }
}

export class ThemeAvatar {
  enable = false;
  url = '';

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

export class ThemeBackground {
  url = '';
  css_size = '';
  css_position = '';

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
