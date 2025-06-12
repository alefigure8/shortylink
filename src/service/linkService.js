const baseUrl = import.meta.env.VITE_API_URL;
import { LinkResponseDTO } from "../DTO/LinkResponseDTO.js";
import { LinksResponseDTO } from "../DTO/LinksResponseDTO.js";
import { ErrorResponse } from "../util/errorUtil";
import { SuccessResponse } from "../util/successUtil.js";


// CREATE LINK SERVICE
export async function createLink({ id, originalurl, name, customName, token = null }) {
  let response = await fetch(`${baseUrl}/link/${id}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: token ? `Bearer ${token}` : "",
    },
    body: JSON.stringify({
      originalurl: originalurl,
      name: name,
      customName: customName || null,
    }),
  });

  if (!response.ok) {
    const errorDto = await ErrorResponse(response);
    throw errorDto;
  }

  const rawData = await response.json();
  return LinkResponseDTO(rawData);
}

// GET ALL LINKS
export async function getLinks({token = null}) {
  let response = await fetch(`${baseUrl}/link`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: token ? `Bearer ${token}` : "",
    },
  });

  if (!response.ok) {
    const errorDto = await ErrorResponse(response);
    throw errorDto;
  }

  const rawData = await response.json();
  return LinksResponseDTO(rawData);
}

// GET LINK BY ID
export async function getLinkById(id, token = null) {
  let response = await fetch(`${baseUrl}/link/${id}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: token ? `Bearer ${token.token}` : "",
    },
  });

  if (!response.ok) {
    const errorDto = await ErrorResponse(response);
    throw errorDto;
  }

  const rawData = await response.json();
  return LinkResponseDTO(rawData);
}

// UPDATE LINK
export async function updateLink({ id, originalUrl, name, isActive, token = null }) {
  let response = await fetch(`${baseUrl}/link/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: token ? `Bearer ${token}` : "",
    },
    body: JSON.stringify({
      id: id,
      originalUrl: originalUrl,
      name: name,
      isActive: isActive
    }),
  });

  if (!response.ok) {
    const errorDto = await ErrorResponse(response);
    throw errorDto;
  }

  const successDto = await SuccessResponse(response);
  return successDto;
}
