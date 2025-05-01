"use client";

import { useEffect, useState } from "react";
import { fetchArticles } from "@/lib/articles";
import { Card, CardContent, Typography, Grid, Button } from "@mui/material";
import Link from "next/link";

export default function ArticleList() {
  const [articles, setArticles] = useState<any[]>([]);

  useEffect(() => {
    fetchArticles().then(setArticles);
  }, []);

  return (
    <Grid container spacing={2}>
      {articles.map((article) => (
        <Grid size={{ xs: 12, md: 6 }} key={article.id}>
          <Card>
            <CardContent>
              <Typography variant="h5">{article.title}</Typography>
              <Typography variant="body2">Classification: {article.classification}</Typography>
              <Typography variant="body2">Sentiment: {article.sentiment}</Typography>
              <Link href={`/articles/${article.id}`}>
                <Button variant="contained" sx={{ mt: 2 }}>View</Button>
              </Link>
            </CardContent>
          </Card>
        </Grid>
      ))}
    </Grid>
  );
}
