"use client";

import Link from "next/link";
import { AppBar, Toolbar, Typography, Button, Stack } from "@mui/material";
import Image from "next/image";

export default function Header() {
  return (
    <AppBar position="static" color="default" elevation={2}>
      <Toolbar sx={{ justifyContent: "space-between" }}>
        <Stack direction="row" alignItems="center" spacing={2}>
          {/* Website Logo */}
          <Link href="/">
            <Image src="/logo.png" alt="Website Logo" width={40} height={40} />
          </Link>

          {/* Website Name */}
          <Typography variant="h6" color="inherit" noWrap component="div">
            NewsCrawler
          </Typography>
        </Stack>

        {/* Navigation Links */}
        <Stack direction="row" spacing={2}>
          <Button color="inherit" component={Link} href="/">Home</Button>
          <Button color="inherit" component={Link} href="/articles">Articles</Button>
          <Button color="inherit" component={Link} href="/profiles">Profiles</Button>
          <Button color="inherit" component={Link} href="/detect">Detect</Button> {/* 👈 New Link */}
        </Stack>
      </Toolbar>
    </AppBar>
  );
}
