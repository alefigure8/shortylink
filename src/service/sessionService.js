import { isTokenExpired } from "../util/tokenUtil";

export function saveSession(session) {
  localStorage.setItem("session", JSON.stringify(session));
}

export function getSession() {
  const session = localStorage.getItem("session");

  if (isTokenExpired(session)) {
    clearSession();
    return null;
  }
  
  return session ? JSON.parse(session) : null;
}

export function clearSession() {
  localStorage.removeItem("session");
}
