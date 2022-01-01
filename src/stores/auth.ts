import { User } from "@/@types";
import AuthService from "@/services/AuthService";
import { AxiosError } from "axios";
import { defineStore } from "pinia";

export const useAuthStore = defineStore({
  id: "auth",
  state: () => ({
    username: null as string | null,
    token: null as string | null,
  }),
  actions: {
    logout() {
      localStorage.removeItem("user");
      this.username = null;
      this.token = null;
    },
    async login(username: string, password: string): Promise<string | void> {
      return AuthService.login({ username, password })
        .then((response) => {
          this.username = response.data.username;
          this.token = response.data.token;

          const user: User = {
            username: this.username,
            token: this.token,
          };

          localStorage.setItem("user", JSON.stringify(user));
        })
        .catch((error: AxiosError) => {
          return error.response?.data.error;
        });
    },
  },
});
