"use client";

import { useState, useEffect } from "react";
import { fetchArticles } from "@/lib/articles";
import {
  Container,
  Typography,
  Grid,
  Card,
  CardContent,
  TextField,
  Button,
  Select,
  MenuItem,
  FormControl,
  Stack,
  CircularProgress,
  Checkbox,
  FormGroup,
  FormControlLabel,
  Divider,
  Chip,
  Box,
  CardMedia,
} from "@mui/material";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import LottieClientWrapper from '@/components/LottieClientWrapper';

import SearchIcon from "@mui/icons-material/Search";
import TuneIcon from "@mui/icons-material/Tune";
import LabelIcon from "@mui/icons-material/Label";
import CalendarTodayIcon from "@mui/icons-material/CalendarToday";
import ArticleIcon from "@mui/icons-material/Article";

const CLASSIFICATIONS = ["Politics", "Technology", "Economy", "Environment"];
const SENTIMENTS = ["Positive", "Neutral", "Negative"];

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

  const toggleFilter = (filterArray: string[], setFilterArray: any, value: string) => {
    if (filterArray.includes(value)) {
      setFilterArray(filterArray.filter(f => f !== value));
    } else {
      setFilterArray([...filterArray, value]);
    }
  };


  return (
    <Container sx={{ mt: 5 }}>
      <LottieClientWrapper 
        src="/lottie/website-design.json" 
        width="200px"
        height="200px"
      />
      <Stack direction="row" alignItems="center" spacing={1} mb={3}>
        <TuneIcon />
        <Typography variant="h5">Filter Articles</Typography>
      </Stack>
      <Divider sx={{ mb: 3 }} />

      <Grid container spacing={4}>
        {/* Left Sidebar Filters */}
        <Grid size={{ xs: 12, md: 3 }}>
          <form onSubmit={handleFilterSubmit}>
            <Stack spacing={3}>
              <TextField
                label="Search Articles"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                fullWidth
                InputProps={{
                  startAdornment: <SearchIcon sx={{ mr: 1 }} />,
                }}
              />

              <Divider />

              <Typography variant="h6">Classification</Typography>
              <FormGroup>
                {CLASSIFICATIONS.map((item) => (
                  <FormControlLabel
                    key={item}
                    control={
                      <Checkbox
                        checked={classificationFilters.includes(item.toLowerCase())}
                        onChange={() =>
                          toggleFilter(classificationFilters, setClassificationFilters, item.toLowerCase())
                        }
                      />
                    }
                    label={item}
                  />
                ))}
              </FormGroup>

              <Divider />

              <Typography variant="h6">Sentiment</Typography>
              <FormGroup>
                {SENTIMENTS.map((item) => (
                  <FormControlLabel
                    key={item}
                    control={
                      <Checkbox
                        checked={sentimentFilters.includes(item.toLowerCase())}
                        onChange={() =>
                          toggleFilter(sentimentFilters, setSentimentFilters, item.toLowerCase())
                        }
                      />
                    }
                    label={item}
                  />
                ))}
              </FormGroup>

              <Divider />

              <Typography variant="h6">Sort By</Typography>
              <FormControl fullWidth>
                <Select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                >
                  <MenuItem value="newest">Newest</MenuItem>
                  <MenuItem value="oldest">Oldest</MenuItem>
                  <MenuItem value="relevance">Relevance</MenuItem>
                </Select>
              </FormControl>

              <Button variant="contained" type="submit" fullWidth sx={{ mt: 2 }}>
                Apply Filters
              </Button>
            </Stack>
          </form>
        </Grid>

        {/* Articles Listing */}
        <Grid size={{ xs: 12, md: 9 }}>
          <Stack spacing={2} direction="row" justifyContent="space-between" alignItems="center" mb={2}>
            <Typography variant="subtitle1">{totalResults} results found</Typography>
          </Stack>

          <Stack spacing={3}>
            {articles.map((article) => (
              <Card key={article.id} sx={{
                display: 'flex',
                p: 2,
                transition: "0.3s",
                "&:hover": { boxShadow: 6 }
              }}>
                <Box sx={{ flex: 1 }}>
                  <CardContent>
                    <Typography variant="subtitle2" color="textSecondary" gutterBottom>
                      <CalendarTodayIcon sx={{ fontSize: 14, mr: 1 }} />
                      {article.classification?.toUpperCase()} | {new Date(article.published_at).toLocaleDateString()}
                    </Typography>
                    <Typography variant="h5" component="div" gutterBottom>
                      {article.title || <i>Untitled Article</i>}
                    </Typography>
                    <Typography variant="body2" color="textSecondary" paragraph>
                      {article.summary || article.content?.substring(0, 150) || "No summary available..."}
                    </Typography>
                    <Stack direction="row" spacing={1} sx={{ flexWrap: "wrap" }}>
                      {(article.tags?.split(",") || []).map((tag: string, idx: number) => (
                        <Chip
                          key={idx}
                          label={tag.trim()}
                          icon={<LabelIcon fontSize="small" />}
                          size="small"
                          variant="outlined"
                        />
                      ))}
                    </Stack>
                    <Stack direction="row" spacing={2} mt={2}>
                      <Link href={`/articles/${article.id}`}>
                        <Button variant="outlined" startIcon={<ArticleIcon />}>View Details</Button>
                      </Link>
                    </Stack>
                  </CardContent>
                </Box>

                <CardMedia
                  component="img"
                  image={article.thumbnail_url || "/default-thumbnail.png"}
                  alt="thumbnail"
                  sx={{ width: 160, height: 160, borderRadius: 2, objectFit: "cover" }}
                />
              </Card>
            ))}
          </Stack>

          {/* Load More Button */}
          {loading ? (
            <Stack alignItems="center" mt={4}>
              <CircularProgress />
            </Stack>
          ) : hasMore && (
            <Stack alignItems="center" mt={4}>
              <Button variant="outlined" onClick={handleLoadMore}>
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
        </Grid>
      </Grid>
    </Container>
  );
}
