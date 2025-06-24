export function SummaryMainDTO(response) {
  return {
    browserUsages: response.browserUsages || [],
    dailyClicks: response.dailyClicks || [],
    totalClicksInPeriod: response.totalClicksInPeriod || 0
  };
}