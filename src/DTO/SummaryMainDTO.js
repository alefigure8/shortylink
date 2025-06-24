export function SummaryMainDTO(response) {

    if(response?.dailyClicks.length > 0)
    {
        response.dailyClicks = response?.dailyClicks.map( el => {
            return {
                date: new Date(el.date).toLocaleDateString(undefined, {year: 'numeric', month: 'numeric', day: 'numeric' }),
                clicks: el.clicks
            }
        })
    }
    
  return {
    browserUsages: response.browserUsages || [],
    dailyClicks: response.dailyClicks || [],
    totalClicksInPeriod: response.totalClicksInPeriod || 0
  };
}