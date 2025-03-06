import { createCookieSessionStorage, redirect } from "react-router";
import type { AuthUser } from "./models/user.model";

type SessionData = {
  user: AuthUser;
};

type SessionFlashData = {
  error: string;
};

const { getSession, commitSession, destroySession } =
  createCookieSessionStorage<SessionData, SessionFlashData>(
    {
      cookie: {
        name: "__session",
        secrets: ["s3cret!"],
        sameSite: "lax",
        path: "/",
        httpOnly: true,
        secure: true,
      }
    }
  );

export async function checkUserSession(request: Request) {
  const session = await getSession(request.headers.get("Cookie"));
  const user = session.get("user");
  if (!user) {
    throw redirect("/login");
  }
  return user;
}

export { getSession, commitSession, destroySession };