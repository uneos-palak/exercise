import { AuthService } from "../api";

export async function redirectToLoginIfNecessary() {
  try {
    const user = await AuthService.getCurrentUserUserGet();
    console.log(`Logged in as ${user.username} (roles: [${user.roles}])`);
  } catch {
    console.log("Not logged in. Redirecting to login...");
    window.location.href =
      import.meta.env.VITE_OPENAPI_BASE +
      "/login?after_login=" +
      encodeURIComponent(window.location.href);
  }
}
