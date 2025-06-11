import { isTokenExpired } from "../util/tokenUtil";
import { ErrorResponse } from "../util/errorUtil.js";
import { TokenResponseDTO } from "../DTO/TokenResponsDTO.js";

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

// Function to check if the session is valid
export function clearSession() {
  localStorage.removeItem("session");
}

// LOGIN SERVICE
export async function loginService({ email, password }) {
  const baseUrl = import.meta.env.VITE_API_URL;

  const response = await fetch(`${baseUrl}/account/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ email, password }),
    credentials: 'include'
  });

  if (!response.ok) {
    const errorDto = await ErrorResponse(response);
    throw errorDto;
  }

  const data = await response.json();
  return TokenResponseDTO(data);
}

// LOGOUT SERVICE
export async function logoutService(token) {
  const baseUrl = import.meta.env.VITE_API_URL;

  const response = await fetch(`${baseUrl}/account/logout`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token.token}`,
    },
    credentials: 'include'
  });

  if (!response.ok) {
    const errorDto = await ErrorResponse(response);
    throw errorDto;
  }

  return true;
}

// REFRESH TOKEN SERVICE
export async function refreshTokenService(token) {
  const baseUrl = import.meta.env.VITE_API_URL;

  const response = await fetch(`${baseUrl}/account/refresh`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token.token}`,
    },
    credentials: 'include'
  });

  if (!response.ok) {
    const errorDto = await ErrorResponse(response);
    throw errorDto;
  }

  const data = await response.json();

  return TokenResponseDTO(data);
}