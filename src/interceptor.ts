import { User } from "@/@types";
import axios, { AxiosError } from "axios";

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

homeApi.interceptors.response.use(
  (response) => {
    return response;
  },
  (error: AxiosError) => {
    if (error.response?.status === 401) {
      localStorage.removeItem("user");
      window.location.href = "login";
    }

    return error;
  },
);

// homeApi.interceptors.request.use(
//   (config) => {
//     const rawUser = localStorage.getItem("user");
//     if (typeof rawUser === "string" && config) {
//       const user: User = JSON.parse(localStorage.getItem("user") ?? "");
//       config.headers = {
//         Authorization: "Bearer " + user?.token,
//       };
//     }

//     return config;
//   },
//   (error) => {
//     return Promise.reject(error);
//   },
// );

export { homeApi };
