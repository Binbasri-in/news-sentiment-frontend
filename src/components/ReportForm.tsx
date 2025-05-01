"use client";

import { useState } from "react";
import { TextField, Button, Stack } from "@mui/material";

interface ReportFormProps {
  onSubmit: (reason: string) => Promise<void>;
}

export default function ReportForm({ onSubmit }: ReportFormProps) {
  const [reason, setReason] = useState("");

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    await onSubmit(reason);
  };

  return (
    <form onSubmit={handleSubmit}>
      <Stack spacing={2}>
        <TextField
          label="Reason for reporting"
          multiline
          rows={4}
          value={reason}
          onChange={(e) => setReason(e.target.value)}
          required
        />
        <Button type="submit" variant="contained" color="error">
          Submit Report
        </Button>
      </Stack>
    </form>
  );
}
