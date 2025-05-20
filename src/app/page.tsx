// src/app/page.tsx
'use client';

import dynamic from 'next/dynamic';
import { Stack, Typography, Button, Box, Grid, Paper } from "@mui/material";
import Link from "next/link";

// Dynamically import the LottiePlayer with SSR disabled
const LottiePlayer = dynamic(() => import('@/components/LottiePlayer'), {
  ssr: false,
});

const features = [
  {
    title: "Profiles Management",
    description: "Easily manage and customize monitoring profiles for different ministries or topics.",
  },
  {
    title: "Crawling & Scraping",
    description: "Continuously gather news articles from multiple sources in real-time.",
  },
  {
    title: "Detection & Sentiment",
    description: "Automatically detect, classify, and analyze sentiment of news content using AI.",
  },
  {
    title: "Analytics",
    description: "Visualize trends, flagged content, and sentiment distribution with interactive dashboards.",
  },
];

export default function Home() {
  return (
    <Stack spacing={6} alignItems="center" mt={10}>
      <LottiePlayer 
        src="/lottie/video-marketing.json" 
        width="300px" 
        height="300px"
      />

      <Typography variant="h2" textAlign="center">News Dashboard</Typography>

      <Typography variant="h6" color="text.secondary" textAlign="center" maxWidth={600}>
        AI-powered platform for real-time news monitoring, sentiment analysis, and ministry-wise classification with tools to flag misleading content.
      </Typography>

      <Grid container spacing={3} justifyContent="center" maxWidth={900} pb={4}>
        {features.map((feature) => (
          <Grid size={{ xs: 12, sm: 6, md: 3 }} key={feature.title}>
        <Paper elevation={3} sx={{ p: 3, height: '100%', textAlign: 'center', pb: 3 }}>
          <Typography variant="h6" gutterBottom>{feature.title}</Typography>
          <Typography variant="body2" color="text.secondary">{feature.description}</Typography>
        </Paper>
          </Grid>
        ))}
      </Grid>

    </Stack>
  );
}
