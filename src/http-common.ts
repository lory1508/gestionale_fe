import axios, { AxiosInstance } from "axios";

const api: AxiosInstance = axios.create({
  baseURL: "http://localhost:3000/",
  headers: {
    "Content-type": "application/json",
  },
});

export default api;
