import axios from "axios";

const API_URL = "https://api.football-data.org/v4/";

export const apiClient = axios.create({
  baseURL: API_URL,
  headers: {
    "X-Auth-Token": import.meta.env.VITE_FOOTBALL_DATA_API_KEY,
  },
});
