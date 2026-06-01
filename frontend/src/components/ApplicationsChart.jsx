import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid
} from "recharts";

import "../styles/ApplicationsChart.css";

function ApplicationsChart() {

  const data = [
    { month: "Jan", applications: 2 },
    { month: "Feb", applications: 5 },
    { month: "Mar", applications: 7 },
    { month: "Apr", applications: 10 },
    { month: "May", applications: 12 }
  ];

  return (

    <div className="chart-card">

      <h2>
        📈 Application Trends
      </h2>

      <ResponsiveContainer
        width="100%"
        height={300}
      >

        <LineChart data={data}>

          <CartesianGrid strokeDasharray="3 3" />

          <XAxis dataKey="month" />

          <YAxis />

          <Tooltip />

          <Line
            type="monotone"
            dataKey="applications"
            stroke="#8b5cf6"
            strokeWidth={4}
          />

        </LineChart>

      </ResponsiveContainer>

    </div>
  );
}

export default ApplicationsChart;