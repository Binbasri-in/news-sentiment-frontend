// src/app/analytics/page.tsx
"use client";

import { Box, Typography } from "@mui/material";
import Image from "next/image";

export default function ImageSpreadPage() {
  return (
    <Box sx={{ position: "relative", width: "100%", height: "100vh", overflow: "hidden" }}>
      {/* Full-screen background image */}
      <Image
        src="/banner.jpg" // Place your image in the public folder (e.g. public/banner.jpg)
        alt="Spread Banner"
        fill
        style={{ objectFit: "cover" }}
        priority
      />

      {/* Optional overlay content */}
      <Box
        sx={{
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          backgroundColor: "rgba(0,0,0,0.4)", // semi-transparent overlay
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Typography variant="h2" color="white">
          Welcome to the News Portal
        </Typography>
      </Box>
    </Box>
  );
}
