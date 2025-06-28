import BarChartAnalytic from "../../component/dashboard/BarChartAnalytic";
import PieChartAnalytic from "../../component/dashboard/PieChartAnalytic";
import useAnalytics from "../../hooks/useAnalytics";
import "../../styles/pages/dashboard/dashboard.css";
import Spinner from "../../component/spinner/Spinner";
import { useEffect, useState } from "react";
import LineChartAnalytic from "../../component/dashboard/LineChartAnalytic";
import AreaChartAnalytic from "../../component/dashboard/AreaChartAnalytic";

function DashboardAnalytics() {
  const { mainSummary, loading, analyticsFetch } = useAnalytics();
  const [days, setDays] = useState(30);

  useEffect(() => {
    const fetch = async () => await analyticsFetch(days);
    fetch();
  }, [days, setDays]);

  if (loading) return <Spinner />;

  const selectHandle = (e) => {
    let monthSelected = e.target.value;
    setDays(monthSelected);
  };

  const months = [30, 60, 90, 120, 180, 210, 280, 360];

  return (
    <div className="dashboard-main-container">
      <div className="dashboard-card-chart">
        <div className="select-container">
          <label htmlFor="days-select" className="select-label">
            Ver datos de los últimos:
          </label>
          <select
            id="days-select"
            className="custom-select"
            onChange={selectHandle}
            value={days}
          >
            {months.map((el) => (
              <option key={el} value={el}>
                {el} días
              </option>
            ))}
          </select>
        </div>
      </div>
      {/* TODO: DESPLEGABLE PARA CAMBIAR LA CANTIDAD DE DIAS */}
      <div className="dashboard-card-chart">
        <h2 className="chart-title">
          Clicks de los últimos {mainSummary?.dailyClicks?.length} días
        </h2>
        <AreaChartAnalytic mainSummary={mainSummary} />
      </div>
      <div className="dashboard-card-chart">
        <h2 className="chart-title">
          Browsers de los últimos {mainSummary?.dailyClicks?.length} días
        </h2>
        <PieChartAnalytic mainSummary={mainSummary} />
      </div>
    </div>
  );
}

export default DashboardAnalytics;
