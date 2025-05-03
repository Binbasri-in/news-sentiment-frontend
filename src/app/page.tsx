// src/app/page.tsx
'use client';

import dynamic from 'next/dynamic';
import { Stack, Typography, Button } from "@mui/material";
import Link from "next/link";

// Dynamically import the LottiePlayer with SSR disabled
const LottiePlayer = dynamic(() => import('@/components/LottiePlayer'), {
  ssr: false,
});

export default function Home() {
  return (
    <Stack spacing={6} alignItems="center" mt={10}>
      <LottiePlayer 
        src="/lottie/video-marketing.json" 
        width="300px" 
        height="300px"
      />

      <Typography variant="h2">News Dashboard</Typography>

      <Stack spacing={2} direction="row">
        <Link href="/profiles"><Button variant="contained">Manage Profiles</Button></Link>
        <Link href="/articles"><Button variant="contained">View Articles</Button></Link>
      </Stack>
    </Stack>
  );
}
