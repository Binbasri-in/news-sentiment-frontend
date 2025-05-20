'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import {
  Container,
  Typography,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Box,
} from '@mui/material';
import { fetchProfiles } from '@/lib/profiles';

export default function DashboardLandingPage() {
  const [profiles, setProfiles] = useState<string[]>([]);
  const [selectedProfile, setSelectedProfile] = useState('');
  const router = useRouter();

  useEffect(() => {
    const loadProfiles = async () => {
      try {
        const result = await fetchProfiles();
        setProfiles(result.map((p: any) => p.name));
      } catch (err) {
        console.error('Failed to load profiles:', err);
      }
    };

    loadProfiles();
  }, []);

  const handleChange = (event: any) => {
    const name = event.target.value;
    setSelectedProfile(name);
    router.push(`/dashboard/${name}`);
  };

  return (
    <Container sx={{ height: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <Box sx={{ width: 300 }}>
        <Typography variant="h5" gutterBottom textAlign="center">
          Select a Profile to View Analytics
        </Typography>

        <FormControl fullWidth>
          <InputLabel id="profile-select-label">Profile</InputLabel>
          <Select
            labelId="profile-select-label"
            id="profile-select"
            value={selectedProfile}
            label="Profile"
            onChange={handleChange}
          >
            {profiles.map((profileName) => (
              <MenuItem key={profileName} value={profileName}>
                {profileName}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </Box>
    </Container>
  );
}
