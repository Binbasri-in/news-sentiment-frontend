// src/lib/detectArticle.ts
import api from "./api";

export interface Article {
  id: string;
  title?: string;
  summary?: string;
  content?: string;
  classification?: string;
  ministry_to_report?: string;
  published_at: string;
  tags?: string;
  sentiment?: string;
  positive_sentiment?: number;
  negative_sentiment?: number;
  neutral_sentiment?: number;
  url?: string;
}

export async function detectArticleFromUrl(url: string): Promise<Article> {
  const response = await api.post("/detect", { url });
  return response.data;
}
