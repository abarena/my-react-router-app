import { createCookieSessionStorage } from "react-router";
import type { AuthUser } from "./models/user.model";

type SessionData = {
  user: AuthUser;
};

type SessionFlashData = {
  error: string;
};

export const sessionStorage =
  createCookieSessionStorage<SessionData, SessionFlashData>(
    {
      cookie: {
        name: "__session",
        secrets: ["s3cret"],
        sameSite: "lax",
        path: "/",
        httpOnly: true,
        secure: true,
      },
    }
  );