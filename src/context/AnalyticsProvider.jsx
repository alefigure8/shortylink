import { useEffect, useState } from "react";
import useSession from "../hooks/useSession";
import { AnalyticsContext } from "./AnalyticsContext";
import { isTokenExpired } from "../util/tokenUtil";
import { fetchDashboardSummary } from "../service/analyticService";

export function AnalyticsProvider({ children }) {
  const { session, logout } = useSession();
  const [mainSummary, setMainSummary] = useState(null);

  //Main fetch
  useEffect(() => {
    const fetchData = async () => {
      try {
        if (!session) return;

        if (isTokenExpired(session)) {
          logout();
          return;
        }

        let summary = await fetchDashboardSummary(session.token);
        
        setMainSummary(summary);
      } catch (error) {
        console.log(error);
      }
    };

    fetchData();
  }, [session, setMainSummary, logout]);

  return (
    <AnalyticsContext.Provider value={{ mainSummary }}>
      {children}
    </AnalyticsContext.Provider>
  );
}
