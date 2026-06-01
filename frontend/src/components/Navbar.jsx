import { Link, useNavigate } from "react-router-dom";
import "../styles/Navbar.css";

function Navbar() {

  const navigate = useNavigate();

  const handleLogout = () => {

    localStorage.removeItem("token");

    navigate("/");
  };

  return (

    <nav className="navbar">

      <div className="logo">

        PlacementPilot 🚀

      </div>

      <div className="nav-links">

        <Link to="/dashboard">
          Dashboard
        </Link>

        <Link to="/applications">
          Applications
        </Link>

        <Link to="/resumes">
          Resumes
        </Link>

      </div>

      <button
        className="logout-btn"
        onClick={handleLogout}
      >
        Logout
      </button>

    </nav>
  );
}

export default Navbar;