export function LinkResponseDTO(response) {
  if (response?.dailyClicks.length > 0) {
    response.dailyClicks = response?.dailyClicks.map((el) => {
      return {
        ...el,
        date: new Date(el.date),
      };
    });
  }
  return {
    id: response.id,
    shortUrl: response.shortUrl,
    originalUrl: response.originalUrl,
    name: response.name,
    accessCount: response.accessCount || 0,
    createdAt: response.createdAt || null,
    isActive: response.isActive || false,
    lastAccessedAt: response.lastAccessedAt || null,
    clickLink: response.clickLink || [],
    dailyClicks: response.dailyClicks || []
  };
}
