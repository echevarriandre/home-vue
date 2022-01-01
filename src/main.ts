import { AxiosError } from "axios";
import { createPinia } from "pinia";
import { createApp } from "vue";
import { User } from "./@types";
import App from "./App.vue";
import "./assets/base.css";
import { homeApi } from "./axios.config";
import router from "./router";
import { routeNames } from "./router/routes";
import { useAuthStore } from "./stores/auth";

const app = createApp(App);

app.use(createPinia());
app.use(router);

if (window.localStorage) {
  const authStore = useAuthStore();
  const localUserJson = window.localStorage.getItem("user");

  if (typeof localUserJson === "string") {
    const localUser: User = JSON.parse(localUserJson);

    if (localUser && authStore.username !== localUser.username) {
      authStore.username = localUser.username;
      authStore.token = localUser.token;
    }
  }
}

homeApi.interceptors.response.use(
  (response) => {
    return response;
  },
  (error: AxiosError) => {
    if (error.response?.status === 401) {
      useAuthStore().logout();
      router.push({ name: routeNames.login });
    }

    return error;
  },
);

app.mount("#app");
