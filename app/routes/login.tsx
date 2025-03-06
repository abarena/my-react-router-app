import { data, Form, redirect } from "react-router";
import type { Route } from "./+types/login";

import { getSession, commitSession } from "../sessions.server";
import { authenticator, FORM_STRATEGY } from "../services/auth.server";

export async function loader({
  request,
}: Route.LoaderArgs) {
  const session = await getSession(request.headers.get("Cookie"));

  if (session.has("user")) {
    return redirect("/");
  }

  return data(
    { error: session.get("error") },
    {
      headers: {
        "Set-Cookie": await commitSession(session),
      },
    }
  );
}

export async function action({
  request,
}: Route.ActionArgs) {
  const session = await getSession(request.headers.get("Cookie"));
  try {
    const user = await authenticator.authenticate(FORM_STRATEGY, request);
    if (!user) {
      session.flash("error", "Invalid username/password");
      return redirect("/", {
        headers: {
          "Set-Cookie": await commitSession(session),
        },
      });
    }
    
    session.set("user", user);

    return redirect("/", {
      headers: {
        "Set-Cookie": await commitSession(session),
      },
    });
  } catch (error) {
    if (error instanceof Error) {
      session.flash("error", error.message);
      return redirect("/login", {
        headers: {
          "Set-Cookie": await commitSession(session),
        },
      });
    }
  }
}

export default function Login({
  loaderData,
}: Route.ComponentProps) {
  const { error } = loaderData;

  return (
    <Form id="login-form" role="login" method="post">
      <h1>Please sign in</h1>
      <div id="textfield">
        <label>Email:</label>
        <input
          aria-label="Email"
          placeholder="example@email.com"
          type="email"
          name="email"
          required
        />
      </div>
      <div id="textfield">
        <label>Password:</label>
        <input
            type="password"
            name="password"
            required
          />
      </div>
      <button className="login-btn" type="submit">Login</button>
      {error ? <h5 className="error">{error}</h5> : null}
    </Form>
  );
}

