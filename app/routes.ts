import { index, layout, route, type RouteConfig } from "@react-router/dev/routes";

export default [
  layout("layouts/sidebar.tsx", [
    index("routes/home.tsx"),
    route("contacts/:conetactId", "routes/contact.tsx"),
  ]),
  route("about", "routes/about.tsx"),
] satisfies RouteConfig;
