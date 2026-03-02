import { mockFetch } from "./client";

const ADMIN_CREDS = { email: "admin@lankabites.lk", password: "admin123" };

export function login(email: string, password: string): Promise<{ token: string; email: string }> {
  return mockFetch(() => {
    if (email === ADMIN_CREDS.email && password === ADMIN_CREDS.password) {
      return { token: "mock-jwt-" + Date.now(), email };
    }
    throw { message: "Invalid email or password", code: "AUTH_FAILED" };
  }, { failRate: 0 });
}

export function logout(): Promise<void> {
  return mockFetch(() => undefined, { failRate: 0 });
}
