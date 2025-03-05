import { Form, Link, redirect } from "react-router";
import { sessionStorage } from "../sessions.server";
import type { Route } from "./+types/logout";

export async function action({
  request,
}: Route.ActionArgs) {
  const session = await sessionStorage.getSession(request.headers.get("Cookie"));
  return redirect("/login", {
    headers: {
      "Set-Cookie": await sessionStorage.destroySession(session),
    },
  });
}

export default function LogoutRoute() {
  return (
      <Form id="logout-form" method="post">
        <h2>Are you sure you want to log out?</h2>
        <button type="submit">Logout</button>
        <Link to="/">Go Back</Link>
      </Form>
  );
}
