import { motion } from "framer-motion";
import "../styles/Dashboard.css";

import HeroBanner from "../components/HeroBanner";
import Sidebar from "../components/Sidebar";

import {
  HiOutlineDocumentText,
  HiOutlineTrophy,
  HiOutlineXCircle
} from "react-icons/hi2";

import { MdOutlineTrackChanges } from "react-icons/md";

import RecentApplications from "../components/RecentApplications";
import ApplicationsChart from "../components/ApplicationsChart";
import { useEffect, useState }
from "react";

import {
  getMyApplications
}
from "../services/applicationService";

function Dashboard() {
  const [applications,
       setApplications] =
       useState([]);
       useEffect(() => {

  const loadApplications =
    async () => {

      try {

        const data =
          await getMyApplications();

        setApplications(data);

      } catch(error) {

        console.log(error);
      }
    };

  loadApplications();

}, []);
const stats = [

  {
    title: "Applications",
    value:
      applications.length,
    icon:
      <HiOutlineDocumentText />,
    color: "#3b82f6"
  },

  {
    title: "Interviews",
    value:
      applications.filter(
        app =>
        app.status ===
        "INTERVIEW"
      ).length,

    icon:
      <MdOutlineTrackChanges />,
    color: "#f59e0b"
  },

  {
    title: "Offers",
    value:
      applications.filter(
        app =>
        app.status ===
        "SELECTED"
      ).length,

    icon:
      <HiOutlineTrophy />,
    color: "#22c55e"
  },

  {
    title: "Rejected",
    value:
      applications.filter(
        app =>
        app.status ===
        "REJECTED"
      ).length,

    icon:
      <HiOutlineXCircle />,
    color: "#ef4444"
  }

];

  return (
    <div className="dashboard-layout">

      <Sidebar />

      <div className="dashboard">

        <HeroBanner />

        <div className="stats-grid">

          {stats.map((stat, index) => (

            <motion.div
              key={index}
              className="stat-card"
              initial={{
                opacity: 0,
                y: 30
              }}
              animate={{
                opacity: 1,
                y: 0
              }}
              transition={{
                delay: index * 0.15
              }}
            >

              <div
                className="stat-icon"
                style={{
                  backgroundColor: stat.color
                }}
              >
                {stat.icon}
              </div>

              <h3>{stat.title}</h3>

              <h2>{stat.value}</h2>

              <p className="stat-growth">
                ↗ Growing
              </p>

            </motion.div>

          ))}

        </div>

        <RecentApplications />

        <ApplicationsChart />

      </div>

    </div>
  );
}

export default Dashboard;