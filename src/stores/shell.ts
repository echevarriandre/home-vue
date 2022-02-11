import { defineStore } from "pinia";
import { useAuthStore } from "./auth";

export const useShellStore = defineStore({
  id: "shell",
  state: () => ({
    user: useAuthStore().username ?? "guest",
    path: "~/login",
    program: "ddg",
  }),
});
