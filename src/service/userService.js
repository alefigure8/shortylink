import { TokenResponseDTO } from "../DTO/TokenResponsDTO.js";
import { UserResponseDTO } from "../DTO/UserResponseDTO.js";
import { ErrorResponse } from "../util/errorUtil.js";


// GET USER
export async function getUser(token) {
  const baseUrl = import.meta.env.VITE_API_URL;

  const response = await fetch(`${baseUrl}/account/profile`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });

  if (!response.ok) {
    const errorDto = await ErrorResponse(response);
    throw errorDto;
  }

  const userData = await response.json();
  const userDto = UserResponseDTO(userData);
  return userDto;
}

// UPDATE USER SERVICE
export async function updateUser(token, userData) {
  const baseUrl = import.meta.env.VITE_API_URL;

  const response = await fetch(`${baseUrl}/account/profile`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(
      {
        firstName: userData.firstName,
        lastName: userData.lastName,
        profilePictureUrl: userData.profilePictureUrl || ""
      }
    ),
  });

  if (!response.ok) {
    const errorDto = await ErrorResponse(response);
    throw errorDto;
  }
}

// REGISTER USER SERVICE
export async function registerUser(userData) {
  const baseUrl = import.meta.env.VITE_API_URL;
  const response = await fetch(`${baseUrl}/account/register`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      firstName: userData.firstName,
      lastName: userData.lastName,
      email: userData.email,
      password: userData.password,
    }),
  });

  if (!response.ok) {
    const errorDto = await ErrorResponse(response);
    throw errorDto;
  }

  return TokenResponseDTO(await response.json());
}
