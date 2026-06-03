import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid
} from "recharts";

import { useEffect, useState }
from "react";

import {
  getMyApplications
}
from "../services/applicationService";

import "../styles/ApplicationsChart.css";

function ApplicationsChart() {

  const [data,
         setData] =
         useState([]);

  useEffect(() => {

    const loadData =
      async () => {

        try {

          const applications =
            await getMyApplications();

          const chartData = [

            {
              status: "Applied",
              count:
                applications.filter(
                  app =>
                  app.status ===
                  "APPLIED"
                ).length
            },

            {
              status: "OA",
              count:
                applications.filter(
                  app =>
                  app.status ===
                  "OA_CLEARED"
                ).length
            },

            {
              status: "Interview",
              count:
                applications.filter(
                  app =>
                  app.status ===
                  "INTERVIEW"
                ).length
            },

            {
              status: "Selected",
              count:
                applications.filter(
                  app =>
                  app.status ===
                  "SELECTED"
                ).length
            },

            {
              status: "Rejected",
              count:
                applications.filter(
                  app =>
                  app.status ===
                  "REJECTED"
                ).length
            }

          ];

          setData(chartData);

        } catch(error) {

          console.log(error);
        }
      };

    loadData();

  }, []);

  return (

    <div className="chart-card">

      <h2>
        📊 Application Status Overview
      </h2>

      <ResponsiveContainer
        width="100%"
        height={300}
      >

        <BarChart data={data}>

          <CartesianGrid
            strokeDasharray="3 3"
          />

          <XAxis
            dataKey="status"
          />

          <YAxis />

          <Tooltip />

          <Bar
            dataKey="count"
            fill="#8b5cf6"
            radius={[8,8,0,0]}
          />

        </BarChart>

      </ResponsiveContainer>

    </div>
  );
}

export default ApplicationsChart;