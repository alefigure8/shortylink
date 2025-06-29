import { useState } from "react";
import useSession from "../hooks/useSession";
import { AnalyticsContext } from "./AnalyticsContext";
import { isTokenExpired } from "../util/tokenUtil";
import { fetchDashboardClicks, fetchDashboardSummary } from "../service/analyticService";

export function AnalyticsProvider({ children }) {
  const { session, logout } = useSession();
  const [mainSummary, setMainSummary] = useState(null);
  const [loading, setLoading] = useState(true);
  const [clickLink, setClickLink] = useState(0);

  //Links Analytics
  const analyticsFetch = async (days = 30) => {
    setLoading(true);

    if (!session) return;

    if (isTokenExpired(session)) {
      logout();
      return;
    }

    let summary = await fetchDashboardSummary(session.token, days);
    setMainSummary(summary);

    setLoading(false);
  };

  // Link By Id Analytics
  const analyticsByIdFetch = async (id) => {
    setLoading(true);

    if (!session) return;

    if (isTokenExpired(session)) {
      logout();
      return;
    }
    let clickLink = await fetchDashboardClicks(id, session.token);
    setClickLink(clickLink)
    setLoading(false);
    
  };
  return (
    <AnalyticsContext.Provider value={{ mainSummary, clickLink, loading, setLoading, analyticsFetch, analyticsByIdFetch }}>
      {children}
    </AnalyticsContext.Provider>
  );
}
