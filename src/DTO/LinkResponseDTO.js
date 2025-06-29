export function LinkResponseDTO(response) {
  return {
    id: response.id,
    shortUrl: response.shortUrl,
    originalUrl: response.originalUrl,
    name: response.name,
    accessCount: response.accessCount || 0,
    createdAt: response.createdAt || null,
    isActive: response.isActive || false,
    lastAccessedAt: response.lastAccessedAt || null,
  };
}
