import { useCallback, useState } from "react";
import useSession from "../hooks/useSession";
import { AnalyticsContext } from "./AnalyticsContext";
import { isTokenExpired } from "../util/tokenUtil";
import {
  fetchDashboardClicks,
  fetchDashboardSummary,
} from "../service/analyticService";
import useLoading from "../hooks/useLoading";
import useMessage from "../hooks/useMessage";

export function AnalyticsProvider({ children }) {
  const { session, logout } = useSession();
  const [mainSummary, setMainSummary] = useState(null);
  const { startLoading, stopLoading } = useLoading();
  const [clickLink, setClickLink] = useState(0);
  const {showMessage} = useMessage();

  //Links Analytics
  const analyticsFetch =useCallback( async (days = 30) => {
    startLoading();
    if (!session) return;

    if (isTokenExpired(session)) {
      logout();
      stopLoading();
      return;
    }
    try {
      let summary = await fetchDashboardSummary(session.token, days);
      setMainSummary(summary);
    } catch (error) {
      showMessage(error.message, 'error')
    } finally {
      stopLoading();
    }
  },[startLoading, stopLoading, logout, session, showMessage]);

  // Link By Id Analytics
  const analyticsByIdFetch = useCallback(
    async (id) => {
    try {
      startLoading();
      if (!session) return;

      if (isTokenExpired(session)) {
        logout();
        return;
      }
      let clickLink = await fetchDashboardClicks(id, session.token);
      setClickLink(clickLink);
    } catch (error) {
      showMessage(error.message, 'error')
    } finally {
      stopLoading();
    }
  }, [session, startLoading, stopLoading, logout, showMessage]);

  return (
    <AnalyticsContext.Provider
      value={{ mainSummary, clickLink, analyticsFetch, analyticsByIdFetch }}
    >
      {children}
    </AnalyticsContext.Provider>
  );
}
