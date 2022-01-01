import { User } from "@/@types";
import axios from "axios";

const homeApi = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
});

homeApi.interceptors.request.use(
  (config) => {
    const user: User = JSON.parse(localStorage.getItem("user") ?? "{}");
    config.headers = {
      Authorization: "Bearer " + user?.token,
    };

    return config;
  },
  (error) => {
    return Promise.reject(error);
  },
);

export { homeApi };
