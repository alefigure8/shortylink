import "../../styles/pages/dashboard/dashboard.css";
import { CartesianGrid, XAxis, YAxis, Tooltip, LineChart, Bar, Line, Area } from "recharts";

function LineChartAnalytic({ mainSummary }) {

  return (
    <LineChart width={800} height={400} data={mainSummary?.dailyClicks}>
      <CartesianGrid stroke="#ccc" strokeDasharray="2 2" />
      <XAxis
        dataKey="date"
        type="number"
        scale="time"
        domain={["auto", "auto"]}
        ticks={mainSummary?.dailyClicks.map((item) => item.date.getTime())}
        tickFormatter={(unixTimestamp) => {
          const date = new Date(unixTimestamp);
          const day = date.getUTCDate().toString().padStart(2, "0");
          const month = (date.getUTCMonth() + 1).toString().padStart(2, "0");
          return `${day}/${month}`;
        }}
        interval={3}
      />
      <YAxis />
      <Line type="linear" dataKey="clicks" stroke="#00c49f" strokeWidth={2} activeDot={{ r: 6 }}/>
      <Tooltip
        wrapperStyle={{ width: 100, backgroundColor: "#ddd" }}
        labelFormatter={(labelTimestamp) => {
          const date = new Date(labelTimestamp);
          const day = date.getUTCDate().toString().padStart(2, "0");
          const month = (date.getUTCMonth() + 1).toString().padStart(2, "0");
          const year = date.getUTCFullYear();
          return `${day}/${month}/${year}`;
        }}
        formatter={(value, name, props) => {
          const dateOfClick = new Date(props.payload.date);
          const day = dateOfClick.getUTCDate().toString().padStart(2, "0");
          const month = (dateOfClick.getUTCMonth() + 1)
            .toString()
            .padStart(2, "0");
          const year = dateOfClick.getUTCFullYear();
          const formattedDateForTooltip = `${day}/${month}/${year}`;
          return [value, `${name} en ${formattedDateForTooltip}`];
        }}
      />
    </LineChart>
  );
}

export default LineChartAnalytic;
