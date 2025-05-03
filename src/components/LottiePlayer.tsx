// components/LottiePlayer.tsx
'use client';

import { Player } from "@lottiefiles/react-lottie-player";

export default function LottiePlayer({ src, width, height }: { src: string; width: string; height: string }) {
  return (
    <Player
      src={src}
      background="transparent"
      speed={1}
      style={{ width, height }}
      loop
      autoplay
    />
  );
}
