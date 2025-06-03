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
  });

  if (!response.ok) {
    const errorDto = await mapErrorResponse(response);
    throw errorDto;
  }

  const data = await response.json();
  return mapLoginResponseToDto(data);
}
