"use client";

import ProfileForm from "@/components/ProfileForm";
import { fetchProfiles, updateProfile } from "@/lib/profiles";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { Container, Typography } from "@mui/material";

export default async function EditProfilePage({ params }: { params: Promise<{ name: string }> }) {
  const router = useRouter();
  const [profile, setProfile] = useState<any>(null);

  useEffect(() => {
    fetchProfiles().then(profiles => {
      const found = profiles.find(async (p: any) => p.name === (await params).name);
      if (found) setProfile(found);
    });
  }, [(await params).name]);

  const handleUpdate = async (data: any) => {
    await updateProfile((await params).name, data);
    router.push("/profiles");
  };

  if (!profile) return <p>Loading...</p>;

  return (
    <Container sx={{ mt: 5 }}>
      <Typography variant="h4" mb={4}>Edit Profile</Typography>
      <ProfileForm onSubmit={handleUpdate} initialData={profile} />
    </Container>
  );
}
