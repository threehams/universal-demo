import * as React from "react";
import Radium = require("radium");

import panelStyles from "../styles/panel";

interface TabContainerProps {
  equalWidth?: boolean;
}

export const TabContainerBase: React.StatelessComponent<TabContainerProps> = ({
  children,
  equalWidth
}) => (
  <div style={[styles.all, equalWidth && styles.equalWidth]}>{children}</div>
);

export const TabContainer = Radium(TabContainerBase);

const styles = {
  all: {
    backgroundColor: "#e8e8e8",
    borderBottom: panelStyles.border,
    width: "100%"
  },
  equalWidth: {
    display: "flex",
    flexFlow: "row wrap"
  }
};
