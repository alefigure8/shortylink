import { mapErrorResponse } from "../util/errorUtil";

function mapUserResponseToDto(response) {
  return {
    email: response.Email,
    name: response.FullName,
    profilePicture: response.ProfilePicture,
    totalLinks: response.TotalLinks,
  };
}

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

  const userData =  await response.json();
  return mapUserResponseToDto(userData);
  
}
