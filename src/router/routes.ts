import LinksView from "@/views/LinksView.vue";
import LoginView from "@/views/LoginView.vue";
import { RouteRecordRaw } from "vue-router";

export enum routeNames {
  links = "links",
  login = "login",
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
];
