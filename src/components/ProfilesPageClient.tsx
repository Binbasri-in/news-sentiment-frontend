'use client';

import { Stack, Typography, Button } from '@mui/material';
import Link from 'next/link';
import ProfileList from './ProfileList'; // 👈 Import it
import LottieClientWrapper from '@/components/LottieClientWrapper';


export default function ProfilesPageClient() {
  return (
    <Stack spacing={6} alignItems="center" mt={10}>
      <LottieClientWrapper
        src="/lottie/adword-digital-marketing.json"
        width="300px"
        height="300px"
      />

      <Typography variant="h2">Profiles</Typography>

      {/* 👉 Render the ProfileList below the buttons */}
      <ProfileList />
    </Stack>
  );
}
