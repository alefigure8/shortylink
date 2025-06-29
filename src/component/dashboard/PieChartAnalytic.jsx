import "../../styles/pages/dashboard/dashboard.css";
import { Tooltip, Legend, PieChart, Pie, Cell } from "recharts";

function PieChartAnalytic({ mainSummary }) {
  const CustomTooltip = ({ active, payload }) => {
    const isVisible = active && payload && payload.length;
    return (
      <div
        className="custom-tooltip"
        style={{ visibility: isVisible ? "visible" : "hidden" }}
      >
        {isVisible && (
          <>
            <div className="tooltip-chart">
              <p className="tooltip-label">{`${payload[0].name}`}</p>
              <p className="tooltip-value">{`${payload[0].value}`}</p>
            </div>
          </>
        )}
      </div>
    );
  };

  const RADIAN = Math.PI / 180;
  const renderCustomizedLabel = ({
    cx,
    cy,
    midAngle,
    innerRadius,
    outerRadius,
    percent,
  }) => {
    const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
    const x = cx + radius * Math.cos(-midAngle * RADIAN);
    const y = cy + radius * Math.sin(-midAngle * RADIAN);

    return (
      <text
        x={x}
        y={y}
        fill="white"
        textAnchor={x > cx ? "start" : "end"}
        dominantBaseline="central"
      >
        {`${(percent * 100).toFixed(0)}%`}
      </text>
    );
  };

  const COLORS = [
    "#0088FE",
    "#00C49F",
    "#FFBB28",
    "#FF8042",
    "#AF19FF",
    "#FF1942",
  ];
  return (
    <PieChart width={800} height={400}>
      <Pie
        data={mainSummary?.browserUsages}
        dataKey="clicks"
        nameKey="browserName"
        cx="50%"
        cy="50%"
        labelLine={false}
        label={renderCustomizedLabel}
      >
        {mainSummary?.browserUsages.map((entry, index) => (
          <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
        ))}
      </Pie>
      <Tooltip content={CustomTooltip} />
      <Legend />
    </PieChart>
  );
}

export default PieChartAnalytic;
