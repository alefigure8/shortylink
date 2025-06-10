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

import { mapErrorResponse } from "../util/errorUtil.js";

export function mapLoginResponseToDto(response) {
  return {
    token: response.token,
    email: response.email,
    expiration: new Date(response.expiration),
  };
}

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
    const errorDto = await mapErrorResponse(response);
    throw errorDto;
  }

  const data = await response.json();
  return mapLoginResponseToDto(data);
}

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
    const errorDto = await mapErrorResponse(response);
    throw errorDto;
  }

  return true;
}

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
    const errorDto = await mapErrorResponse(response);
    throw errorDto;
  }

  const data = await response.json();

  return mapLoginResponseToDto(data);
}