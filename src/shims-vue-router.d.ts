export {};

declare module "vue-router" {
  interface RouteMeta {
    guest?: boolean;
    authenticated?: boolean;
  }
}
