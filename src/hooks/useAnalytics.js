import { useContext } from "react";
import { AnalyticsContext } from "../context/AnalyticsContext";

function useAnalytics()
{
    return useContext(AnalyticsContext);
}

export default useAnalytics;