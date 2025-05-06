// src/components/ArticleDetail.tsx
"use client";

import { fetchArticle } from "@/lib/articles";
import { useEffect, useState } from "react";
import {
  Typography,
  Button,
  Card,
  CardContent,
  Chip,
  Box,
  Stack,
  LinearProgress
} from "@mui/material";
import Link from "next/link";
import CalendarTodayIcon from "@mui/icons-material/CalendarToday";
import ArticleIcon from "@mui/icons-material/Article";
import BusinessIcon from "@mui/icons-material/Business";
import LabelIcon from "@mui/icons-material/Label";
import SentimentSatisfiedIcon from "@mui/icons-material/SentimentSatisfied";
import SentimentVeryDissatisfiedIcon from "@mui/icons-material/SentimentVeryDissatisfied";
import SentimentNeutralIcon from "@mui/icons-material/SentimentNeutral";

export default function ArticleDetail({ id }: { id: number }) {
  const [article, setArticle] = useState<any>(null);

  useEffect(() => {
    fetchArticle(id).then(setArticle);
  }, [id]);

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

  if (!article) return <Typography>Loading...</Typography>;

  return (
    <Card sx={{ p: 2, m: 6 }}>
      <CardContent>
      {/* Header Info */}
      <Box sx={{ display: "flex", justifyContent: "space-between", mb: 2 }}>
        <Typography variant="subtitle2" color="textSecondary">
        <CalendarTodayIcon sx={{ fontSize: 14, mr: 1 }} />
        {article.classification?.toUpperCase()} |{" "}
        {new Date(article.published_at).toLocaleDateString()}
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

      {/* Title and Content */}
      <Typography variant="h4" gutterBottom>
        {article.title || <i>Untitled Article</i>}
      </Typography>

      <Typography variant="body1" paragraph>
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
      <Stack direction="row" spacing={2}>
        <Link href={`/articles/${article.id}/report`}>
          <Button variant="outlined" color="error">
          Report Article
          </Button>
        </Link>
        <Button
          variant="contained"
          color="primary"
          href={article.url}
          target="_blank"
          rel="noopener noreferrer"
        >
          View Original Article
        </Button>
        </Stack>

      </CardContent>
    </Card>
  );
}
