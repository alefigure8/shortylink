import useAnalytics from "../../hooks/useAnalytics";
import "../../styles/pages/dashboard/dashboard.css";
import {
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  BarChart,
  Legend,
  Bar,
  PieChart,
  Pie,
  Cell,
} from "recharts";

function DashboardAnalytics() {
  const { mainSummary } = useAnalytics();

  const COLORS = [
    "#0088FE",
    "#00C49F",
    "#FFBB28",
    "#FF8042",
    "#AF19FF",
    "#FF1942",
  ];

  return (
    <div className="dashboard-main-container">
      <div className="dashboard-card-chart">
        <h2>Links por día</h2>
        <BarChart width={800} height={400} data={mainSummary?.dailyClicks}>
          <CartesianGrid stroke="#ccc" strokeDasharray="2 2" />
          <XAxis dataKey="date" />
          <YAxis />
          <Bar dataKey="clicks" fill="#82ca9d" />
          <Tooltip />
        </BarChart>
      </div>
      <div className="dashboard-card-chart">
        <h2>Browsers</h2>
        <PieChart width={800} height={400}>
          <Pie
            data={mainSummary?.browserUsages}
            dataKey="clicks"
            nameKey="browserName"
            cx="50%"
            cy="50%"
          >
            {mainSummary?.browserUsages.map((entry, index) => (
              <Cell
                key={`cell-${index}`}
                fill={COLORS[index % COLORS.length]}
              />
            ))}
          </Pie>
          <Tooltip />
          <Legend />
        </PieChart>
      </div>
    </div>
  );
}

export default DashboardAnalytics;
