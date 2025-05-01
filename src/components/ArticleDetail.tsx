"use client";

import { fetchArticle } from "@/lib/articles";
import { useEffect, useState } from "react";
import { Typography, Button, Card, CardContent } from "@mui/material";
import Link from "next/link";

export default function ArticleDetail({ id }: { id: number }) {
  const [article, setArticle] = useState<any>(null);

  useEffect(() => {
    fetchArticle(id).then(setArticle);
  }, [id]);

  if (!article) return <p>Loading...</p>;

  return (
    <Card>
      <CardContent>
        <Typography variant="h3">{article.title}</Typography>
        <Typography variant="body1" sx={{ mt: 2 }}>{article.content}</Typography>
        <Typography variant="caption" display="block" sx={{ mt: 2 }}>
          Published at: {new Date(article.published_at).toLocaleString()}
        </Typography>

        <Link href={`/articles/${article.id}/report`}>
          <Button variant="outlined" color="error" sx={{ mt: 3 }}>
            Report Article
          </Button>
        </Link>
      </CardContent>
    </Card>
  );
}
