"use client";

import { createTheme, ThemeProvider, CssBaseline } from "@mui/material";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { ReactNode } from "react";

const darkTheme = createTheme({
  palette: {
    mode: "dark",
    background: {
      default: "#121212",
      paper: "#1e1e1e",
    },
  },
  typography: {
    fontFamily: '"Poppins", "Fira Sans", "Roboto", sans-serif',
    h1: { fontFamily: '"Fira Sans", sans-serif', fontWeight: 700 },
    h2: { fontFamily: '"Fira Sans", sans-serif', fontWeight: 600 },
    h3: { fontFamily: '"Fira Sans", sans-serif' },
    h4: { fontFamily: '"Poppins", sans-serif', fontWeight: 600 },
    h5: { fontFamily: '"Poppins", sans-serif', fontWeight: 600 },
    body1: { fontFamily: '"Poppins", sans-serif' },
    body2: { fontFamily: '"Poppins", sans-serif' },
  },
});

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" href="/favicon.ico" />
        <link href="https://fonts.googleapis.com/css2?family=Poppins:wght@400;600&family=Fira+Sans:wght@300;700&display=swap" rel="stylesheet" />
        <script src="https://unpkg.com/@lottiefiles/lottie-player@latest/dist/lottie-player.js"></script>
        <title>NewsCrawler - Aggregated News</title>
      </head>
      <body>
        <ThemeProvider theme={darkTheme}>
          <CssBaseline />
          <Header />
          <main style={{ minHeight: "85vh" }}>
            {children}
          </main>
          <Footer />
        </ThemeProvider>
      </body>
    </html>
  );
}
