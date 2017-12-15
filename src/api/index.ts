import axios from 'axios';
import { HexoConfig } from '@/models/hexo-config.class';
import { Category, PostsList, SpecificPostsList, Tag } from '@/models/posts-list.class';
import { Article, Page } from '@/models/article.class';


// GET /api/site.json
export async function fetchHexoConfig() {
  return axios.get<HexoConfig>('/api/site.json');
}

// GET /api/posts/:pageNum.json (default 1.json)
export async function fetchPostsList(currentPage: number = 1) {
  return axios.get<PostsList>(`/api/posts/${currentPage}.json`);
}

// GET /api/tags/:TagName.json
export async function fetchPostsListByTag(tagName: string) {
  return axios.get<SpecificPostsList>(`/api/tags/${tagName}.json`);
}

// GET /api/categories/:slug.json
export async function fetchPostsListByCategory(categoryName: string) {
  return axios.get<SpecificPostsList>(`/api/categories/${categoryName}.json`);
}


// GET /api/articles/:Slug.json
export async function fetchPostBySlug(slug: string) {
  return axios.get<Article>(`/api/articles/${slug}.json`);
}


// GET /api/tags.json
export async function fetchAllTags() {
  return axios.get<Tag[]>('/api/tags.json');
}


// GET /api/categories.json
export async function fetchAllCategories() {
  return axios.get<Category[]>('/api/categories.json');
}


// GET /api/pages/about/index.json
// source : e.g. about/index
export async function fetchImplicitPageBySource(source: string) {
  return axios.get<Page>(`/api/pages/${source}.json`);
}


