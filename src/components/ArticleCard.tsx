// src/components/ArticleCard.tsx
"use client";

import {
  Card,
  CardContent,
  Typography,
  Stack,
  Chip,
  Box,
  CardMedia,
  Button,
} from "@mui/material";
import Link from "next/link";
import LabelIcon from "@mui/icons-material/Label";
import CalendarTodayIcon from "@mui/icons-material/CalendarToday";
import ArticleIcon from "@mui/icons-material/Article";

interface ArticleCardProps {
  article: {
    id: string;
    title?: string;
    summary?: string;
    content?: string;
    classification?: string;
    published_at: string;
    tags?: string;
    thumbnail_url?: string;
  };
}

export default function ArticleCard({ article }: ArticleCardProps) {
  return (
    <Card sx={{
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
  );
}