import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import api from "../services/api";
import "../styles/Login.css";

function Register() {

  const navigate = useNavigate();

  const [name, setName] =
    useState("");

  const [email, setEmail] =
    useState("");

  const [password, setPassword] =
    useState("");

  const handleRegister =
    async () => {

      try {

        await api.post(
          "/users/register",
          {
            name,
            email,
            password
          }
        );

        alert(
          "Registration Successful 🚀"
        );

        navigate("/");

      } catch (error) {

        console.error(error);

        alert(
          "Registration Failed"
        );
      }
    };

  return (

    <div className="login-page">

      <div className="glow glow1"></div>

      <div className="glow glow2"></div>

      <motion.div
        className="hero-section"
        initial={{
          opacity: 0,
          x: -60
        }}
        animate={{
          opacity: 1,
          x: 0
        }}
      >

        <div className="brand">
          <h1>
            PlacementPilot
          </h1>

          <span>🚀</span>
        </div>

        <h2>
          Start.
          <br />
          Build.
          <br />
          Get Placed.
        </h2>

        <p>
          Create your account and
          start tracking your
          placement journey.
        </p>

      </motion.div>

      <motion.div
        className="login-card"
        initial={{
          opacity: 0,
          x: 60
        }}
        animate={{
          opacity: 1,
          x: 0
        }}
      >

        <h2>
          Create Account ✨
        </h2>

        <input
          type="text"
          placeholder="Full Name"
          value={name}
          onChange={(e) =>
            setName(e.target.value)
          }
        />

        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) =>
            setEmail(e.target.value)
          }
        />

        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) =>
            setPassword(e.target.value)
          }
        />

        <button
          onClick={handleRegister}
        >
          Register
        </button>

        <p className="register-link">

          Already have an account?

          <span
            onClick={() =>
              navigate("/")
            }
          >
            Login
          </span>

        </p>

      </motion.div>

    </div>
  );
}

export default Register;