import { Link, useNavigate } from "react-router-dom";
import {
  HiOutlineHome,
  HiOutlineDocumentText,
  HiOutlineFolder,
  HiOutlineUser,
  HiOutlineCog6Tooth,
  HiOutlineArrowRightOnRectangle
} from "react-icons/hi2";

import "../styles/Sidebar.css";
function Sidebar() {

  const navigate = useNavigate();

  const logout = () => {

    localStorage.removeItem("token");

    navigate("/");
  };
return (

  <div className="sidebar">

    <div>

      <div className="sidebar-logo">

        <span className="logo-icon">▲</span>

        PlacementPilot 🚀

      </div>

      <div className="sidebar-links">

        <Link to="/dashboard">
          <HiOutlineHome />
          Dashboard
        </Link>

        <Link to="/applications">
          <HiOutlineDocumentText />
          Applications
        </Link>

        <Link to="/resumes">
          <HiOutlineFolder />
          Resumes
        </Link>

      </div>

      <div className="sidebar-extra">

  <Link to="/profile">
    <HiOutlineUser />
    Profile
  </Link>

  <Link to="/settings">
    <HiOutlineCog6Tooth />
    Settings
  </Link>

</div>

    </div>
    <div className="motivation-mini">

  <h3>🎯 Keep Going!</h3>

  <p>
    Consistency today
    brings results tomorrow.
  </p>

</div>

    <button
      className="sidebar-logout"
      onClick={logout}
    >
      <HiOutlineArrowRightOnRectangle />
      Logout
    </button>

  </div>
);
}

export default Sidebar;