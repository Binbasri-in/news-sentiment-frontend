// src/lib/articles.ts
import api from './api';

export async function fetchArticles(params = {}) {
  const response = await api.get('/articles', { params });
  return response.data;
}

export async function fetchArticle(articleId: number) {
  const response = await api.get(`/articles/${articleId}`);
  return response.data;
}

export async function reportArticle(articleId: number, reason: string) {
  const response = await api.post(`/articles/${articleId}/report`, { params: { reason } });
  return response.data;
}
