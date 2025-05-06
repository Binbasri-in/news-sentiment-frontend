"use client";

import { useState } from "react";
import {
  TextField,
  Button,
  Box,
  Typography,
  CircularProgress,
} from "@mui/material";
import { detectArticleFromUrl, Article } from "@/lib/detectArticle";
import CalendarTodayIcon from "@mui/icons-material/CalendarToday";
import BusinessIcon from "@mui/icons-material/Business";
import SentimentSatisfiedIcon from "@mui/icons-material/SentimentSatisfied";
import SentimentVeryDissatisfiedIcon from "@mui/icons-material/SentimentVeryDissatisfied";
import SentimentNeutralIcon from "@mui/icons-material/SentimentNeutral";
import { Card, CardContent, Chip, Stack, LinearProgress } from "@mui/material";
import LabelIcon from "@mui/icons-material/Label";

export default function DetectPage() {
  const [url, setUrl] = useState("");
  const [loading, setLoading] = useState(false);
  const [article, setArticle] = useState<Article | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setArticle(null);

    try {
      const result = await detectArticleFromUrl(url);
      setArticle(result);
    } catch (err: any) {
      setError("Failed to fetch article. Please check the URL and try again.");
    } finally {
      setLoading(false);
    }
  };

  const getSentimentIcon = (sentiment?: string) => {
    switch (sentiment?.toLowerCase()) {
      case "positive":
        return <SentimentSatisfiedIcon color="success" />;
      case "negative":
        return <SentimentVeryDissatisfiedIcon color="error" />;
      default:
        return <SentimentNeutralIcon color="info" />;
    }
  };

  return (
    <Box maxWidth="800px" mx="auto" mt={6}>
      <Typography variant="h4" gutterBottom>
        Detect Article from Link
      </Typography>

      <form onSubmit={handleSubmit}>
        <TextField
          label="Article URL"
          variant="outlined"
          fullWidth
          required
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          sx={{ mb: 2 }}
        />
        <Button type="submit" variant="contained" fullWidth disabled={loading}>
          {loading ? <CircularProgress size={24} color="inherit" /> : "Analyze"}
        </Button>
      </form>

      {error && (
        <Typography color="error" mt={2}>
          {error}
        </Typography>
      )}

      {article && (
        <Card sx={{ p: 2, mt: 4 }}>
          <CardContent>
            {/* Header Info */}
            <Box sx={{ display: "flex", justifyContent: "space-between", mb: 2 }}>
              <Typography variant="subtitle2" color="textSecondary">
                <CalendarTodayIcon sx={{ fontSize: 14, mr: 1 }} />
                {article.classification?.toUpperCase()} |{" "}
                {new Date().toLocaleDateString()} {/* No date in result, so use now */}
              </Typography>
              <Chip
                icon={getSentimentIcon(article.sentiment)}
                label={article.sentiment || "Unknown"}
                color={
                  article.sentiment?.toLowerCase() === "positive"
                    ? "success"
                    : article.sentiment?.toLowerCase() === "negative"
                    ? "error"
                    : "default"
                }
                size="small"
              />
            </Box>

            <Typography variant="h4" gutterBottom>
              {article.title || <i>Untitled Article</i>}
            </Typography>

            <Typography variant="body1" paragraph sx={{ textAlign: "justify" }}>
              {article.content
                ? article.content.split(" ").slice(0, 150).join(" ") + "..."
                : article.summary || "No content available..."}
            </Typography>

            {/* Ministry */}
            <Box sx={{ mb: 2 }}>
          <Typography variant="subtitle2" gutterBottom>
            <BusinessIcon sx={{ fontSize: 16, mr: 1, verticalAlign: 'text-bottom' }} />
            Ministry: <span style={{ fontWeight: 'bold', color: '#1976d2' }}>{article.ministry_to_report || "Not specified"}</span>
          </Typography>
        </Box>

            {/* Sentiment Scores */}
            <Box sx={{ mb: 3 }}>
              <Typography variant="subtitle2" gutterBottom>Sentiment Analysis:</Typography>
              <Box sx={{ display: "flex", alignItems: "center", mb: 1 }}>
                <Typography variant="body2" sx={{ minWidth: 100 }}>Positive:</Typography>
                <Box sx={{ width: "100%", mr: 1 }}>
                  <LinearProgress
                    variant="determinate"
                    value={article.positive_sentiment || 0}
                    color="success"
                    sx={{ height: 8, borderRadius: 1 }}
                  />
                </Box>
                <Typography variant="body2">{article.positive_sentiment || 0}%</Typography>
              </Box>

              <Box sx={{ display: "flex", alignItems: "center", mb: 1 }}>
                <Typography variant="body2" sx={{ minWidth: 100 }}>Negative:</Typography>
                <Box sx={{ width: "100%", mr: 1 }}>
                  <LinearProgress
                    variant="determinate"
                    value={article.negative_sentiment || 0}
                    color="error"
                    sx={{ height: 8, borderRadius: 1 }}
                  />
                </Box>
                <Typography variant="body2">{article.negative_sentiment || 0}%</Typography>
              </Box>

              <Box sx={{ display: "flex", alignItems: "center", mb: 1 }}>
                <Typography variant="body2" sx={{ minWidth: 100 }}>Neutral:</Typography>
                <Box sx={{ width: "100%", mr: 1 }}>
                  <LinearProgress
                    variant="determinate"
                    value={article.neutral_sentiment || 0}
                    color="info"
                    sx={{ height: 8, borderRadius: 1 }}
                  />
                </Box>
                <Typography variant="body2">{article.neutral_sentiment || 0}%</Typography>
              </Box>
            </Box>

            {/* Tags */}
            <Stack direction="row" spacing={1} sx={{ flexWrap: "wrap", mb: 2 }}>
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

            {/* Actions */}
            {article.url && (
              <Button
                variant="contained"
                color="primary"
                href={article.url}
                target="_blank"
                rel="noopener noreferrer"
              >
                View Original Article
              </Button>
            )}
          </CardContent>
        </Card>
      )}
    </Box>
  );
}
