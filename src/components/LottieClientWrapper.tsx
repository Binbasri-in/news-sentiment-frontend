// components/LottieClientWrapper.tsx
'use client';

import dynamic from 'next/dynamic';

// Dynamically import LottiePlayer with SSR disabled (safe here!)
const LottiePlayer = dynamic(() => import('./LottiePlayer'), { ssr: false });

export default function LottieClientWrapper({ src, width, height }: { src: string; width: string; height: string }) {
  return (
    <LottiePlayer src={src} width={width} height={height} />
  );
}
