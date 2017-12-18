export class GitmentOptions {
  enable = false;
  client_id = '';
  client_secret = '';
  per_page = 10;
  max_comment_height = 250;
  github_id = '';
  repository_name = '';

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
