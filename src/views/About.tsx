import React from "react";
import { Link } from "redux-little-router";

import "./About.css";

const About: React.SFC<{}> = () => {
  return (
    <p className="about">
      We are a calm blue. <Link href="/">Would you like to go home?</Link>
    </p>
  );
};

export default About;
