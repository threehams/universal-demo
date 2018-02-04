import * as React from "react";
import Radium = require("radium");
import pure from "recompose/pure";

import { TerminalHistory } from "./TerminalHistory";
import { TerminalPrompt } from "./TerminalPrompt";

import fontStyles from "../styles/font";

export const TerminalBase: React.StatelessComponent<{}> = () => (
  <div style={styles.terminal}>
    <TerminalHistory />
    <div style={styles.terminalPrompt}>
      <TerminalPrompt />
    </div>
  </div>
);

export const Terminal = pure(Radium(TerminalBase));

const styles = {
  terminal: Object.assign(
    {
      display: "flex",
      flexFlow: "column nowrap",
      height: "100%",
    },
    fontStyles.monospace,
  ),
  terminalPrompt: {
    flex: "0 0 30px",
    position: "relative",
  },
};
