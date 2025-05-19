// src/lib/emails.ts
import api from './api';

export async function sendMinistryEmail(emailData: any) {
  const response = await api.post('/emails/ministry', emailData);
  return response.data;
}

export async function sendSourceEmail(emailData: any) {
    const response = await api.post('/emails/source', emailData);
    return response.data;
}