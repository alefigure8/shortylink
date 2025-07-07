import { LinkResponseDTO } from "./LinkResponseDTO";

export function LinksResponseDTO(response) {
  let obj = 
  {
    email: "",
    fullName: "",
    totalLinks: 0,
    links: {
      items: [],
      pageNumber: 0,
      pageSize: 0,
      totalCount: 0,
      totalPages:0
    },
  }
  if(response == null)
    return {};

  obj.email = response.email || obj.email;
  obj.fullName = response.fullName || obj.fullName;
  obj.totalLinks = response.totalLinks || obj.totalLinks;
  obj.links = response.links || obj.links;

  obj.links.items = response?.links?.items.map((link) => LinkResponseDTO(link));

  return obj;
}
