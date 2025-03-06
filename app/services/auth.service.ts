import { Authenticator } from "remix-auth";
import type { AuthUser } from "app/models/user.model";
import { FormStrategy } from "remix-auth-form";



export const FORM_STRATEGY = "form-strategy";

export const authenticator = new Authenticator<AuthUser>();

authenticator.use(
  new FormStrategy(async ({ form }) => {
    let email = form.get("email");
    let password = form.get("password");
    return await validateCredentials(email, password);
  }),
  FORM_STRATEGY
);


export const validateCredentials = (
  email: FormDataEntryValue | null,
  password: FormDataEntryValue | null
): Promise<AuthUser> => {
if (email === 'test@email.com' && password === 'Password123') {
  return Promise.resolve({
    id: 'testId',
    username: 'Angel Barena'
  })
}
  throw new Error("Invalid email or password");
}