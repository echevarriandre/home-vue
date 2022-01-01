import { createPinia } from "pinia";
import { createApp } from "vue";
import { User } from "./@types";
import App from "./App.vue";
import "./assets/base.css";
import router from "./router";
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

app.mount("#app");
