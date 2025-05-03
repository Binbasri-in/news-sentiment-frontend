import axios from "axios";

const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_HF_API_URL, // must be https!
  timeout: 5000,
  headers: {
    Authorization: `Bearer ${process.env.NEXT_PUBLIC_HF_API_TOKEN}`,
    "Content-Type": "application/json",
  },
});

export default api;
