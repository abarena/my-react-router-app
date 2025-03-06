import { Form, Link, redirect } from "react-router";
import type { Route } from "./+types/logout";
import { checkUserSession, destroySession, getSession } from "../sessions.server";

export async function loader({ request }: Route.LoaderArgs){
  try {
    await checkUserSession(request);
  } catch (error) {
    return error;
  }
};

export async function action({
  request,
}: Route.ActionArgs) {
  const session = await getSession(request.headers.get("Cookie"));
  return redirect("/login", {
    headers: {
      "Set-Cookie": await destroySession(session),
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
