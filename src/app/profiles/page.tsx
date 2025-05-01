import ProfileList from "@/components/ProfileList";
import { Typography, Container, Box } from "@mui/material";

export default function ProfilesPage() {
  return (
    <Container sx={{ mt: 5 }}>
      {/* User Profiles Animation */}
      <Box textAlign="center" mb={4}>
      <img
          src="/gifs/team-profiles.gif"
          alt="Profiles Animation"
          style={{ width: '200px', height: '200px', margin: '0 auto' }}
        />
      </Box>

      <Typography variant="h4" mb={4}>Profiles</Typography>
      <ProfileList />
    </Container>
  );
}
