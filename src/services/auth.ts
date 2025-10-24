export const AUTH_KEY = "isAdmin";

export function isAdmin(): boolean {
  return localStorage.getItem(AUTH_KEY) === "true";
}

export function setAdmin(flag: boolean) {
  localStorage.setItem(AUTH_KEY, String(flag));
}

export function logout() {
  localStorage.removeItem(AUTH_KEY);
}