"use client";

import { useState } from "react";
import { TextField, Button, Stack } from "@mui/material";

interface ProfileFormProps {
  onSubmit: (formData: any) => Promise<void>;
  initialData?: any;
}

export default function ProfileForm({ onSubmit, initialData }: ProfileFormProps) {
  const [formData, setFormData] = useState({
    name: initialData?.name || "",
    base_url: initialData?.base_url || "",
    language: initialData?.language || "",
    crawling_strategy: initialData?.crawling_strategy || "",
    is_active: initialData?.is_active ?? true,
  });

  const handleChange = (e: any) => {
    const { name, value, type, checked } = e.target;
    setFormData({ ...formData, [name]: type === "checkbox" ? checked : value });
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    await onSubmit(formData);
  };

  return (
    <form onSubmit={handleSubmit}>
      <Stack spacing={2}>
        <TextField label="Name" name="name" value={formData.name} onChange={handleChange} required />
        <TextField label="Base URL" name="base_url" value={formData.base_url} onChange={handleChange} required />
        <TextField label="Language" name="language" value={formData.language} onChange={handleChange} required />
        <TextField label="Crawling Strategy" name="crawling_strategy" value={formData.crawling_strategy} onChange={handleChange} required />

        <Button variant="contained" type="submit">Save</Button>
      </Stack>
    </form>
  );
}
