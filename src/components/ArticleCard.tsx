// src/components/ArticleCard.tsx
"use client";

import {
  Card,
  CardContent,
  Typography,
  Stack,
  Chip,
  Box,
  Button,
  LinearProgress
} from "@mui/material";
import Link from "next/link";
import LabelIcon from "@mui/icons-material/Label";
import CalendarTodayIcon from "@mui/icons-material/CalendarToday";
import ArticleIcon from "@mui/icons-material/Article";
import BusinessIcon from "@mui/icons-material/Business";
import SentimentSatisfiedIcon from "@mui/icons-material/SentimentSatisfied";
import SentimentVeryDissatisfiedIcon from "@mui/icons-material/SentimentVeryDissatisfied";
import SentimentNeutralIcon from "@mui/icons-material/SentimentNeutral";

interface ArticleCardProps {
  article: {
    id: string;
    title?: string;
    url: string;
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
  };
}

export default function ArticleCard({ article }: ArticleCardProps) {
  // Function to determine sentiment icon based on sentiment value
  const getSentimentIcon = (sentiment?: string) => {
    switch(sentiment?.toLowerCase()) {
      case 'positive':
        return <SentimentSatisfiedIcon color="success" />;
      case 'negative':
        return <SentimentVeryDissatisfiedIcon color="error" />;
      default:
        return <SentimentNeutralIcon color="info" />;
    }
  };

  return (
    <Card sx={{
      p: 2,
      transition: "0.3s",
      "&:hover": { boxShadow: 6 }
    }}>
      <CardContent>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
          <Typography variant="subtitle2" color="textSecondary">
            <CalendarTodayIcon sx={{ fontSize: 14, mr: 1 }} />
            {article.classification?.toUpperCase()} | {new Date(article.published_at).toLocaleDateString()}
          </Typography>
          <Chip 
            icon={getSentimentIcon(article.sentiment)}
            label={article.sentiment || "Unknown"} 
            color={
              article.sentiment?.toLowerCase() === "positive" ? "success" : 
              article.sentiment?.toLowerCase() === "negative" ? "error" : "default"
            }
            size="small"
          />
        </Box>

        <Typography variant="h5" component="div" gutterBottom>
          {article.title || <i>Untitled Article</i>}
        </Typography>
        
        
        <Box sx={{ mb: 2 }}>
          <Typography variant="subtitle2" gutterBottom>
            <BusinessIcon sx={{ fontSize: 16, mr: 1, verticalAlign: 'text-bottom' }} />
            Ministry: <span style={{ fontWeight: 'bold', color: '#1976d2' }}>{article.ministry_to_report || "Not specified"}</span>
          </Typography>
        </Box>
        
        <Link href={`/articles/${article.id}`} style={{ textDecoration: 'none' }}>
          <Button variant="outlined" startIcon={<ArticleIcon />}>Read Full Article</Button>
        </Link>
      </CardContent>
    </Card>
  );
}