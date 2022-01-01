import { useAuthStore } from "@/stores/auth";
import { createRouter, createWebHistory } from "vue-router";
import { routeNames, routes } from "./routes";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
});

router.beforeEach((to, from, next): void => {
  const isGuestRoute: boolean = to.matched.some((record): boolean | undefined => record.meta.guest);
  const isAuthenticatedRoute: boolean = to.matched.some((record): boolean | undefined => record.meta.authenticated);

  const authStore = useAuthStore();

  if (isAuthenticatedRoute && !isGuestRoute && !authStore.token) {
    // Block Guests from accessing protected routes
    next({ name: routeNames.login, query: { redirect: to.fullPath } });
  } else if (isGuestRoute && !isAuthenticatedRoute && authStore.token) {
    // Block Users from accessing guest routes
    next({ name: from.name ?? routeNames.links });
  } else {
    next();
  }
});

export default router;
