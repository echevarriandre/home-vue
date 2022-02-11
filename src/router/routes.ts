import ErrorView from "@/views/ErrorView.vue";
import LinksView from "@/views/LinksView.vue";
import LoginView from "@/views/LoginView.vue";
import { RouteRecordRaw } from "vue-router";

export enum routeNames {
  links = "links",
  login = "login",
  error = "error",
}

export const routes: RouteRecordRaw[] = [
  {
    path: "/",
    name: routeNames.links,
    component: LinksView,
    meta: {
      authenticated: true,
      guest: false,
    },
  },
  {
    path: "/login",
    name: routeNames.login,
    component: LoginView,
    meta: {
      authenticated: false,
      guest: true,
    },
  },
  {
    path: "/:pathMatch(.*)*",
    name: routeNames.error,
    component: ErrorView,
  },
];
