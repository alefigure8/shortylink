import { LinkResponseDTO } from "./LinkResponseDTO";

export function LinksResponseDTO(response) {
    return {
    email: response.email,
    fullName: response.fullName,
    totalLinks: response.totalLinks,
    links: response.links.map(link => LinkResponseDTO(link)),
  };
}