import { mapErrorResponse } from "../util/errorUtil";

// DTO para mapear la respuesta de error
function mapUserResponseToDto(response) {
  return {
    email: response?.email || "",
    fullName: response?.fullName || "",
    firstName: response?.firstName || "",
    lastName: response?.lastName || "",
    profilePictureUrl: response?.profilePictureUrl || "",
    totalLinks: response?.totalLinks || 0,
  };
}

// Funcion para obtener los datos del usuario
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
    const errorDto = await mapErrorResponse(response);
    throw errorDto;
  }

  const userData = await response.json();
  const userDto = mapUserResponseToDto(userData);
  return userDto;
}

// Funcion para actualizar los datos del usuario
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
    const errorDto = await mapErrorResponse(response);
    throw errorDto;
  }
}
