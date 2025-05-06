// src/components/ArticleList.tsx
"use client";

import { Stack, Typography, Button, CircularProgress } from "@mui/material";
import ArticleCard from "./ArticleCard";
import LottieClientWrapper from "./LottieClientWrapper";

interface ArticleListProps {
  articles: any[];
  loading: boolean;
  hasMore: boolean;
  totalResults: number;
  onLoadMore: () => void;
}

export default function ArticleList({
  articles,
  loading,
  hasMore,
  totalResults,
  onLoadMore,
}: ArticleListProps) {
  return (
    <>
      <Stack spacing={2} direction="row" justifyContent="space-between" alignItems="center" mb={2}>
        <Typography variant="subtitle1">{totalResults} results found</Typography>
      </Stack>

      <Stack spacing={3}>
        {articles.map((article) => (
          <ArticleCard key={article.id} article={article} />
        ))}
      </Stack>

      {/* Load More Button */}
      {loading ? (
        <Stack alignItems="center" mt={4}>
          <CircularProgress />
        </Stack>
      ) : hasMore && (
        <Stack alignItems="center" mt={4}>
          <Button variant="outlined" onClick={onLoadMore}>
            Load More
          </Button>
        </Stack>
      )}

      {!loading && articles.length === 0 && (
        <Stack alignItems="center" spacing={2} mt={6}>
          <LottieClientWrapper 
            src="/lottie/search-for-interface.json" 
            width="300px"
            height="300px"
          />
          <Typography variant="h6" color="textSecondary">
            No articles found. Try adjusting filters.
          </Typography>
        </Stack>
      )}
    </>
  );
}
