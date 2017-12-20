import { GitmentOptions } from "@/models/comments-system.class";

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
    const raw_theme = raw && raw['theme_config'];
    if (raw_theme) {
      this.menu = new ThemeMenu(raw_theme.menu);
      this.menu_icons = raw_theme.menu_icons;
      this.social = raw_theme.social;
      this.social_icons = raw_theme.social_icons;
      this.page_404 = new ThemeCustom404(raw_theme.page_404);
      this.avatar = new ThemeAvatar(raw_theme.avatar);
      this.background = new ThemeBackground(raw_theme.background);
      this.gitment = new GitmentOptions(raw_theme.gitment);
      this.powered_by = raw_theme.powered_by;
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
          Object.assign(this, { [key]: raw[key] });
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
        if (typeof raw[basicKey] === 'boolean' && raw[basicKey]) {
          Object.assign(this, { [basicKey]: extract[basicKey] });
        }
      }

      for (const otherKey of Object.keys(raw)) {
        if (basicKeys.every(basicKey => otherKey !== basicKey)) {
          Object.assign(this, { [otherKey]: raw[otherKey] });
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
          Object.assign(this, { [key]: raw[key] });
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
          Object.assign(this, { [key]: raw[key] });
        }
      }
    }
  }
}
