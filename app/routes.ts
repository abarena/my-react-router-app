import { route, type RouteConfig } from "@react-router/dev/routes";

export default [
  route("contacts/:conetactId", "routes/contact.tsx"),
] satisfies RouteConfig;
