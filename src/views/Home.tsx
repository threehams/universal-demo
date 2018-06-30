import React from "react";
import Link from "redux-first-router-link";

import "./Home.css";

const Home: React.SFC<{}> = () => {
  return (
    <p className="home">
      You are home. Home is red. <Link to="/about">Learn more about us.</Link>
    </p>
  );
};

export default Home;
