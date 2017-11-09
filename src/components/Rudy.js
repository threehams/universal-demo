import React from "react";
import styles from "../css/Rudy";

export default () => (
  <div className={styles.container}>
    <img src="https://cdn.reactlandia.com/rudy-logo.png" />
    <span>Rudy loaded! </span>
    <span style={{ fontSize: 18 }}>
      {" - secret:  "}
      <a
        href="https://github.com/faceyspacey/redux-first-router"
        target="_blank"
      >
        Redux-First Router
      </a>
      {" will be renamed this soon"}
    </span>
  </div>
);
