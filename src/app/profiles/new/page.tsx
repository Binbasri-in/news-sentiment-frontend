"use client";

import ProfileForm from "@/components/ProfileForm";
import { createProfile } from "@/lib/profiles";
import { useRouter } from "next/navigation";
import { Typography, Container } from "@mui/material";

export default function NewProfilePage() {
  const router = useRouter();

  const handleCreate = async (data: any) => {
    await createProfile(data);
    router.push("/profiles");
  };

  return (
    <Container sx={{ mt: 5 }}>
      <Typography variant="h4" mb={4}>Create New Profile</Typography>
      <ProfileForm onSubmit={handleCreate} />
    </Container>
  );
}
