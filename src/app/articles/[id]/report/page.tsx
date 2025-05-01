"use client";

import ReportForm from "@/components/ReportForm";
import { reportArticle } from "@/lib/articles";
import { useRouter } from "next/navigation";
import { Container, Typography } from "@mui/material";

export default function ReportArticlePage({ params }: { params: Promise<{ id: string }> }) {
  const router = useRouter();

  const handleReport = async (reason: string) => {
    await reportArticle(parseInt((await params).id), reason);
    router.push("/articles");
  };

  return (
    <Container sx={{ mt: 5 }}>
      <Typography variant="h4" mb={4}>Report Article</Typography>
      <ReportForm onSubmit={handleReport} />
    </Container>
  );
}
