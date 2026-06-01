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
import RecentApplications
from "../components/RecentApplications";
import MotivationCard from "../components/MotivationCard";
import ApplicationsChart
from "../components/ApplicationsChart";

function Dashboard() {

  const stats = [
  {
    title: "Applications",
    value: 12,
    icon: <HiOutlineDocumentText />,
    color: "#3b82f6"
  },
  {
    title: "Interviews",
    value: 3,
    icon: <MdOutlineTrackChanges />,
    color: "#f59e0b"
  },
  {
    title: "Offers",
    value: 1,
    icon: <HiOutlineTrophy />,
    color: "#22c55e"
  },
  {
    title: "Rejected",
    value: 4,
    icon: <HiOutlineXCircle />,
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