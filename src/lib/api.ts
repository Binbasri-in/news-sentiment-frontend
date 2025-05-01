// src/lib/api.ts

import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:8000", // <-- Your FastAPI URL
  timeout: 5000,
});

export default api;
