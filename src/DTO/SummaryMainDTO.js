export function SummaryMainDTO(response) {
  if (response?.dailyClicks.length > 0) {
    response.dailyClicks = response?.dailyClicks.map((el) => {
      return {
        ...el,
        date: new Date(el.date),
      };
    });
  }

  return {
    browserUsages: response.browserUsages || [],
    dailyClicks: response.dailyClicks || [],
    totalClicksInPeriod: response.totalClicksInPeriod || 0,
    totalClicks: response.totalClicks || 0
  };
}
