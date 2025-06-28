export function SummaryMainDTO(response) {
  if (response?.dailyClicks.length > 0) {
    response.dailyClicks = response?.dailyClicks.map((el) => {
      return {
        ...el,
        date: new Date(el.date),
      };
    });
  }
  if (response?.linkCLick?.length > 0) {
    response.linkCLick = response?.linkCLick.map((el) => ({
      ...el,
      clickedAt: new Date(el.clickedAt),
    }));
  }

  return {
    browserUsages: response.browserUsages || [],
    dailyClicks: response.dailyClicks || [],
    linkCLick: response.linkCLick || [],
    totalClicksInPeriod: response.totalClicksInPeriod || 0,
  };
}
