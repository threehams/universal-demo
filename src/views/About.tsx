import React from "react";
import Link from "redux-first-router-link";

import "./About.css";

const About: React.SFC<{}> = () => {
  return (
    <p className="about">
      We are a calm blue. <Link to="/">Would you like to go home?</Link>
    </p>
  );
};

export default About;
