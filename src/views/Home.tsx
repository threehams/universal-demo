import React from "react";
import { Link } from "redux-little-router";

import "./Home.css";

const Home: React.SFC<{}> = () => {
  return (
    <p className="home">
      Welcome to die! <Link href="/about">Learn more about die</Link>
    </p>
  );
};

export default Home;
