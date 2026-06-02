import React from "react";
import { Link } from "react-router-dom";

function LandingPage() {
  return (
    <section className="landing-hero">
      <div>
        <h1>
          Welcome to <span className="company-name">Paradise Nursery</span>
        </h1>
        <p className="tagline">Bring nature home, one plant at a time.</p>
        <Link to="/products">
          <button type="button" className="btn-get-started">
            Get Started
          </button>
        </Link>
      </div>
    </section>
  );
}

export default LandingPage;
