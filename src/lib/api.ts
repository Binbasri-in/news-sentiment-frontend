import axios from "axios";

const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_HF_API_URL, // must be https!
  headers: {
    "Content-Type": "application/json",
    Authorization: `Bearer ${process.env.NEXT_PUBLIC_HF_API_KEY}`,
  },
});

export default api;
