const baseUrl = import.meta.env.VITE_API_URL;
import { mapErrorResponse } from "../util/errorUtil";

/**
 * 
 * @param {*} response 
 * @returns 
 */

function mapLinkResponseToDto(response) {
  return {
    shortUrl: response.shortUrl,
    originalUrl: response.originalUrl,
    name: response.name,
  };
}


/**
 * 
 * @param {
 * } param0 
 * @returns 
 */
export default async function createLink({ originalurl, name, token = null }) {
  console.log("Entramos")
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
