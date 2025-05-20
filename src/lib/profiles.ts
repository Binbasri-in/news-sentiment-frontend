// src/lib/profiles.ts
import api from './api';

export async function fetchProfiles() {
  const response = await api.get('/profiles');
  return response.data;
}

export async function createProfile(profileData: any) {
  const response = await api.post('/profiles', profileData);
  return response.data;
}

export async function updateProfile(profileName: string, profileData: any) {
  const response = await api.put(`/profiles/${profileName}`, profileData);
  return response.data;
}

export async function deleteProfile(profileName: string) {
  const response = await api.delete(`/profiles/${profileName}`);
  return response.data;
}

export async function triggerCrawl(profileName: string) {
  const response = await api.post(`/profiles/${profileName}/crawl`);
  return response.data;
}

export async function fetchProfileAnalytics(profileName: string) {
  const response = await api.get(`/profiles/${profileName}/analytics`);
  return response.data;
}