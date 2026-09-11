import axios from "axios";

const apiRequest = axios.create({
  baseURL:
    import.meta.env.VITE_API_URL ||
    (import.meta.env.DEV ? "http://localhost:8800/api" : "/api"),
  withCredentials: true,
});

export default apiRequest;