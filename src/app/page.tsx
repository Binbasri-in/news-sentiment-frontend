import Link from "next/link";
import { Button, Stack, Typography } from "@mui/material";
import * as LottiePlayer from "@lottiefiles/lottie-player";

export default function Home() {
  return (
    <Stack spacing={6} alignItems="center" mt={10}>
     <img
                src="/gifs/reading-news.gif"
                alt="Empty Search"
                style={{ width: '500px', height: '500px' }}
              />

      <Typography variant="h2">News Dashboard</Typography>
      
      <Stack spacing={2} direction="row">
        <Link href="/profiles">
          <Button variant="contained">Manage Profiles</Button>
        </Link>
        <Link href="/articles">
          <Button variant="contained">View Articles</Button>
        </Link>
      </Stack>
    </Stack>
  );
}
