// src/components/ArticlesClient.tsx
"use client";

import { useState, useEffect } from "react";
import { fetchArticles } from "@/lib/articles";
import {
  Container,
  Grid,
  Divider,
} from "@mui/material";
import { useRouter, useSearchParams } from "next/navigation";
import LottieClientWrapper from '@/components/LottieClientWrapper';
import ArticleFilters from "./ArticleFilters";
import ArticleList from "./ArticleList";

export default function ArticlesClient() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const [articles, setArticles] = useState<any[]>([]);
  const [search, setSearch] = useState(searchParams.get("search") || "");
  const [classificationFilters, setClassificationFilters] = useState<string[]>(
    searchParams.get("classification")?.split(",") || []
  );
  const [sentimentFilters, setSentimentFilters] = useState<string[]>(
    searchParams.get("sentiment")?.split(",") || []
  );
  const [ministryFilters, setMinistryFilters] = useState<string[]>(
    searchParams.get("ministry")?.split(",") || []
  );
  const [sortBy, setSortBy] = useState(searchParams.get("sort") || "newest");

  const [skip, setSkip] = useState(0);
  const [limit] = useState(6);
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const [totalResults, setTotalResults] = useState(0);

  const loadArticles = async (reset = false) => {
    setLoading(true);
    try {
      const params: any = {
        skip: reset ? 0 : skip,
        limit,
        search: search || undefined,
        classification: classificationFilters.length ? classificationFilters.join(",") : undefined,
        sentiment: sentimentFilters.length ? sentimentFilters.join(",") : undefined,
        sort: sortBy || undefined,
      };
      const data = await fetchArticles(params);

      if (reset) {
        setArticles(data);
      } else {
        setArticles(prev => [...prev, ...data]);
      }
      setHasMore(data.length === limit);
      setTotalResults(reset ? data.length : totalResults + data.length);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadArticles(true);
    setSkip(limit);
  }, []);

  const updateUrlParams = () => {
    const params = new URLSearchParams();
    if (search) params.set("search", search);
    if (classificationFilters.length) params.set("classification", classificationFilters.join(","));
    if (sentimentFilters.length) params.set("sentiment", sentimentFilters.join(","));
    if (sortBy) params.set("sort", sortBy);
    router.push(`/articles?${params.toString()}`);
  };

  const handleFilterSubmit = async (e: any) => {
    e.preventDefault();
    updateUrlParams();
    setSkip(limit);
    await loadArticles(true);
  };

  const handleLoadMore = async () => {
    await loadArticles(false);
    setSkip(prev => prev + limit);
  };

  return (
    <Container sx={{ mt: 5 }}>
      <LottieClientWrapper 
        src="/lottie/website-design.json" 
        width="200px"
        height="200px"
      />
      <Divider sx={{ mb: 3 }} />

      <Grid container spacing={4}>
        {/* Left Sidebar Filters */}
        <Grid size={{ xs: 12, md: 3 }}>
          <ArticleFilters
            search={search}
            setSearch={setSearch}
            classificationFilters={classificationFilters}
            setClassificationFilters={setClassificationFilters}
            sentimentFilters={sentimentFilters}
            setSentimentFilters={setSentimentFilters}
            ministryFilters={ministryFilters}
            setMinistryFilters={setMinistryFilters}
            sortBy={sortBy}
            setSortBy={setSortBy}
            onSubmit={handleFilterSubmit}
          />
        </Grid>

        {/* Articles Listing */}
        <Grid size={{ xs: 12, md: 9 }}>
          <ArticleList
            articles={articles}
            loading={loading}
            hasMore={hasMore}
            totalResults={totalResults}
            onLoadMore={handleLoadMore}
          />
        </Grid>
      </Grid>
    </Container>
  );
}