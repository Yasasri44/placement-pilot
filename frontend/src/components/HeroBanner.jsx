import { useEffect, useState } from "react";
import "../styles/HeroBanner.css";

import {
  getCurrentUser
} from "../services/userService";

function HeroBanner() {

  const [userName,
         setUserName] =
         useState("");

  const quotes = [
    "The offer letter you want tomorrow depends on the applications you submit today.",
    "Every rejection gets you closer to an offer.",
    "Consistency beats intensity.",
    "Apply today. Celebrate tomorrow."
  ];

  const [quoteIndex,
         setQuoteIndex] =
         useState(0);

  useEffect(() => {

    const loadUser =
      async () => {

        try {

          const user =
            await getCurrentUser();

          setUserName(
            user.name
          );

        } catch(error) {

          console.log(error);
        }
      };

    loadUser();

    const interval =
      setInterval(() => {

        setQuoteIndex(
          (prev) =>
            (prev + 1) %
            quotes.length
        );

      }, 5000);

    return () =>
      clearInterval(interval);

  }, []);

  return (

    <div className="hero-banner">

      <div className="hero-content">

        <h1>
          Welcome Back,
          {" "}
          {userName}
          {" "}
          👋
        </h1>

        <p>
          {quotes[quoteIndex]}
        </p>

      </div>

      <div className="hero-rocket">
        🚀
      </div>

    </div>
  );
}

export default HeroBanner;