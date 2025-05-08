import axios from "axios";

const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL, // must be https!
  timeout: 5000,
});

export default api;
