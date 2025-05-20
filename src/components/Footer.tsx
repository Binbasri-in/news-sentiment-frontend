"use client";

import { Container, Typography, Divider, Stack } from "@mui/material";

export default function Footer() {
  return (
    <footer style={{ marginTop: "auto", padding: "2rem 0", backgroundColor: "#1e1e1e" }}>
      <Container>
        <Divider sx={{ mb: 2 }} />
        <Stack spacing={1} textAlign="center">
          <Typography variant="body2" color="textSecondary">
            &copy; {new Date().getFullYear()} NewsGOVInsight. All rights reserved.
          </Typography>
          <Typography variant="caption" color="textSecondary">
            Disclaimer: The content on this website is aggregated from external news sources. We do not guarantee the accuracy or completeness of any information presented.
          </Typography>
        </Stack>
      </Container>
    </footer>
  );
}
