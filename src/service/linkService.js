const baseUrl = import.meta.env.VITE_API_URL;
import { mapErrorResponse } from "../util/errorUtil";

/**
 * 
 * @param {*} response 
 * @returns 
 */

function mapLinkResponseToDto(response) {
  return {
    id: response.id,
    shortUrl: response.shortUrl,
    originalUrl: response.originalUrl,
    name: response.name,
    accessCount: response.accessCount || 0,
    createdAt: response.createdAt || null,
    isActive: response.isActive || false,
    lastAccessedAt: response.lastAccessedAt || null
  };
}

function maplinksResponseToDto(response) {
    return {
    email: response.email,
    fullName: response.fullName,
    totalLinks: response.totalLinks,
    links: response.links.map(link => mapLinkResponseToDto(link)),
  };
}

/**
 * 
 * @param {
 * } param0 
 * @returns 
 */
export async function createLink({ originalurl, name, token = null }) {
  let response = await fetch(`${baseUrl}/link`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: token ? `Bearer ${token}` : "",
    },
    body: JSON.stringify({
      originalurl: originalurl,
      name: name,
    }),
  });

  if (!response.ok) {
    const errorDto = await mapErrorResponse(response);
    throw errorDto;
  }

  const rawData = await response.json();
  return mapLinkResponseToDto(rawData);
}

export async function getLinks({token = null}) {
  let response = await fetch(`${baseUrl}/link`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: token ? `Bearer ${token}` : "",
    },
  });

  if (!response.ok) {
    const errorDto = await mapErrorResponse(response);
    throw errorDto;
  }

  const rawData = await response.json();
  return maplinksResponseToDto(rawData);
}
