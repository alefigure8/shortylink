import "../../styles/pages/dashboard/dashboard.css";
import {
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  Area,
  AreaChart,
} from "recharts";

function AreaChartAnalyticLink({ dataForm }) {

  if(dataForm?.dailyClicks == null)
    return;

  const maxClicks =
    dataForm?.dailyClicks?.length > 0
      ? Math.max(...dataForm.dailyClicks.map((el) => el.clicks))
      : 0;

  const yAxisMax = maxClicks === 0 ? 10 : Math.ceil(maxClicks * 1.1);
  const yAxisMin = maxClicks === 0 ? 0 : "auto";

  const CustomTooltip = ({ active, payload, label }) => {
    const isVisible = active && payload && payload.length;
    const date = new Date(label);
    const day = date.getUTCDate().toString().padStart(2, "0");
    const month = (date.getUTCMonth() + 1).toString().padStart(2, "0");
    const year = date.getUTCFullYear();
    return (
      <div
      className="custom-tooltip"
      style={{ visibility: isVisible ? "visible" : "hidden" }}
      >
        {isVisible && (
          <>
            <div className="tooltip-chart">
              <p className="tooltip-label">{`${day}/${month}/${year}`}</p>
              <p className="tooltip-value">{`${payload[0].value}`}</p>
            </div>
          </>
        )}
      </div>
    );
  };

  return (
    <AreaChart width={600} height={300} data={dataForm?.dailyClicks}>
      <CartesianGrid stroke="#ccc" strokeDasharray="2 2" />
      <XAxis
        dataKey="date"
        fontSize={10}
        type="number"
        scale="time"
        domain={["auto", "auto"]}
        ticks={dataForm?.dailyClicks.map((item) => item?.date.getTime())}
        tickFormatter={(unixTimestamp) => {
          const date = new Date(unixTimestamp);
          const day = date.getUTCDate().toString().padStart(2, "0");
          const month = (date.getUTCMonth() + 1).toString().padStart(2, "0");
          return `${day}/${month}`;
        }}
        interval={3}
      />
      <YAxis fontSize={10} domain={[yAxisMin, yAxisMax]} />
      <Area
        type="linear"
        dataKey="clicks"
        stroke="#00c49f"
        fill="#00c49f"
        opacity={0.5}
        strokeWidth={2}
        activeDot={{ r: 6 }}
      />
      <Tooltip content={CustomTooltip} />
    </AreaChart>
  );
}

export default AreaChartAnalyticLink;
