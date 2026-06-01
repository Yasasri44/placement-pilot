import { useEffect, useState } from "react";
import "../styles/HeroBanner.css";

function HeroBanner() {

  const quotes = [
    "The offer letter you want tomorrow depends on the applications you submit today.",
    "Every rejection gets you closer to an offer.",
    "Consistency beats intensity.",
    "Apply today. Celebrate tomorrow."
  ];

  const [quoteIndex, setQuoteIndex] = useState(0);

  useEffect(() => {

    const interval = setInterval(() => {

      setQuoteIndex(
        (prev) =>
          (prev + 1) % quotes.length
      );

    }, 5000);

    return () => clearInterval(interval);

  }, []);

  return (

    <div className="hero-banner">

      <div className="hero-content">

        <h1>
          Welcome Back, Yasasri 👋
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