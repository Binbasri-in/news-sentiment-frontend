"use client";

import { useEffect, useState } from "react";
import { fetchProfiles, deleteProfile, triggerCrawl } from "@/lib/profiles";
import { Button, Card, CardContent, Typography, Grid } from "@mui/material";
import Link from "next/link";

export default function ProfileList() {
  const [profiles, setProfiles] = useState<any[]>([]);

  useEffect(() => {
    fetchProfiles().then(setProfiles);
  }, []);

  const handleDelete = async (name: string) => {
    await deleteProfile(name);
    setProfiles(profiles.filter(p => p.name !== name));
  };

  const handleCrawl = async (name: string) => {
    await triggerCrawl(name);
    alert(`Crawling triggered for ${name}`);
  };

  return (
    <Grid container spacing={2}>
      {profiles.map((profile) => (
        <Grid size={{ xs: 12, md: 6 }} key={profile.id}>
          <Card>
            <CardContent>
              <Typography variant="h5">{profile.name}</Typography>
              <Typography variant="body2">{profile.base_url}</Typography>
              <Typography variant="body2">Language: {profile.language}</Typography>
              <Typography variant="body2">Crawling State: {profile.crawling_state}</Typography>

              <Button variant="contained" color="primary" onClick={() => handleCrawl(profile.name)} sx={{ mt: 2, mr: 1 }}>
                Crawl
              </Button>
              <Link href="/dashboard/[name]" as={`/dashboard/${profile.name}`}>
                <Button variant="contained" color="secondary" sx={{ mt: 2, mr: 1 }}>
                  View Analytics
                </Button>
              </Link>
              <Button variant="outlined" color="error" onClick={() => handleDelete(profile.name)} sx={{ mt: 2 }}>
                Delete
              </Button>
            </CardContent>
          </Card>
        </Grid>
      ))}
    </Grid>
  );
}
