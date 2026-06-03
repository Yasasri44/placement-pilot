import { motion } from "framer-motion";
import "../styles/Login.css";
import { useState } from "react";
import api from "../services/api";
import { useNavigate } from "react-router-dom";

function Login() {
    const [email, setEmail] = useState("");
const [password, setPassword] = useState("");
const navigate = useNavigate();
const handleLogin = async () => {

  try {

    const response =
      await api.post(
        "/users/login",
        {
          email,
          password
        }
      );

    localStorage.setItem(
      "token",
      response.data.token
    );

    navigate("/dashboard");

  } catch (error) {

    alert("Invalid Credentials");

    console.log(error);
  }
};
  return (
    <div className="login-page">

      <div className="glow glow1"></div>
      <div className="glow glow2"></div>

      <motion.div
        className="hero-section"
        initial={{ opacity: 0, x: -60 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.8 }}
      >
        <div className="brand">
  <h1>PlacementPilot</h1>
  <span>🚀</span>
</div>

        <h2>
          Track.
          <br />
          Prepare.
          <br />
          Get Placed.
        </h2>

        <p>
          Every application is one step
          closer to your dream offer.
        </p>

        <div className="quote-box">
          "Success is the sum of small efforts,
          repeated day in and day out."
        </div>
        <div className="company-row">
  Google • Amazon • Microsoft • Adobe
</div>

      </motion.div>

      <motion.div
        className="login-card"
        initial={{ opacity: 0, x: 60 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.8 }}
      >
        <h2>Welcome Back 👋</h2>

        <input
  type="email"
  placeholder="Email"
  value={email}
  onChange={(e) =>
    setEmail(e.target.value)}
/>

        <input
  type="password"
  placeholder="Password"
  value={password}
  onChange={(e) =>
    setPassword(e.target.value)}
/>
<button onClick={handleLogin}>
  Login
</button>

        <p className="register-link">

  Don't have an account?

  <span
    onClick={() =>
      navigate("/register")
    }
  >
    Register
  </span>

</p>
      </motion.div>

    </div>
  );
}

export default Login;