const baseUrl = import.meta.env.VITE_API_URL;
import { LinkResponseDTO } from "../DTO/LinkResponseDTO.js";
import { LinksResponseDTO } from "../DTO/LinksResponseDTO.js";
import { ErrorResponse } from "../util/errorUtil";
import { SuccessResponse } from "../util/successUtil.js";

// --- CREATE LINK SERVICE ---
export async function createLink({
  originalurl,
  name,
  customName,
  password,
  token = null,
}) {
  let response = await fetch(`${baseUrl}/link/`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: token ? `Bearer ${token}` : "",
    },
    body: JSON.stringify({
      originalurl: originalurl,
      name: name,
      customName: customName || null,
      password: password || null,
    }),
  });

  if (!response.ok) {
    const errorDto = await ErrorResponse(response);
    throw errorDto;
  }

  const rawData = await response.json();
  return LinkResponseDTO(rawData);
}

// --- GET ALL LINKS ---
export async function getLinks(page = 1, links = 5, token = null ) {

  let response = await fetch(`${baseUrl}/link`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: token ? `Bearer ${token}` : "",
      page: page,
      links: links
    }
  });

  if (!response.ok) {
    const errorDto = await ErrorResponse(response);
    throw errorDto;
  }

  const rawData = await response.json();
  return LinksResponseDTO(rawData);
}

// --- GET LINK BY ID ---
export async function getLinkById(id, token = null) {
  let response = await fetch(`${baseUrl}/link/s/${id}`, {
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

// --- UPDATE LINK ---
export async function updateLink({
  id,
  originalUrl,
  name,
  password,
  isActive,
  token = null,
}) {
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
      password: password,
      isActive: isActive,
    }),
  });

  if (!response.ok) {
    const errorDto = await ErrorResponse(response);
    throw errorDto;
  }

  const successDto = await SuccessResponse(response);
  return successDto;
}

// --- DELETE LINK ---
export async function deleteLink(id, {token = null }) {
  let response = await fetch(`${baseUrl}/link/${id}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
      Authorization: token ? `Bearer ${token}` : "",
    },
    body: JSON.stringify({
      id,
    }),
  });

  if (!response.ok) {
    const errorDto = await ErrorResponse(response);
    throw errorDto;
  }

  const successDto = await SuccessResponse(response);
  return successDto;
}

// --- VERIFICAR PASS ---
export async function sendingPass(id, password) {
  let response = await fetch(`${baseUrl}/link/verify-password`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      id,
      password,
    }),
  });

  if (!response.ok) {
    const errorDto = await ErrorResponse(response);
    throw errorDto;
  }
    const data = await response.json();

    if (data.actionType == "Redirect") {
    window.location.href = data.targetUrl;
  } else if (data.actionType == "RequirePassword") {
    window.location.href = `${window.location.origin}/${data.linkId}/pass`;
  } else {
    throw new Error(`Unexpected action type: ${data.actionType}`);
  }
}

// --- REDIRIGIR A URL ORIGINAL ---
export async function redirectTo(id) {
  let response = await fetch(`${baseUrl}/${id}`, {
    headers: {
      method: "GET",
      "Content-Type": "application/json",
    },
  });

  if (!response.ok) {
    const errorDto = await ErrorResponse(response);
    throw errorDto;
  }

  const data = await response.json();
  if (data.actionType == "Redirect") {
    window.location.href = data.targetUrl;
  } else if (data.actionType == "RequirePassword") {
    window.location.href = `${window.location.origin}/${data.linkId}/pass`;
  } else {
    throw new Error(`Unexpected action type: ${data.actionType}`);
  }
}
