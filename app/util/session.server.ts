import { createCookieSessionStorage, redirect } from "@remix-run/node"; // or cloudflare/deno

// somewhere you've got a session storage
const { getSession } = createCookieSessionStorage();

export async function requireUserSession(request: Request) {
  // get the session
  const cookie = request.headers.get("cookie");
  const session = await getSession(cookie);

  // validate the session, `userId` is just an example, use whatever value you
  // put in the session when the user authenticated
  if (!session.has("userId")) {
    // if there is no user session, redirect to login
    throw redirect("/login");
  }

  return session;
}
