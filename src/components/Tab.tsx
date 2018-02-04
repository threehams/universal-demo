import * as React from "react";
import Radium = require("radium");

import { Icon } from "../components/Icon";
import fontStyles from "../styles/font";
import panelStyles from "../styles/panel";

interface TabProps {
  active?: boolean;
  onClick?: () => void;
  onClickClose?: () => void;
}

const TabBase: React.StatelessComponent<TabProps> = ({
  active,
  children,
  onClick,
  onClickClose
}) => (
  <div style={[styles.container, active ? styles.active : styles.inactive]}>
    <div style={styles.flexContainer}>
      <button style={[styles.button, styles.label]} onClick={onClick}>
        {children}
      </button>
      {onClickClose && (
        <button style={styles.button} onClick={onClickClose}>
          <Icon name="fa fa-times" />
        </button>
      )}
    </div>
  </div>
);

export const Tab = Radium(TabBase);

export const styles = {
  active: {
    backgroundColor: "white"
  },
  button: {
    backgroundColor: "transparent",
    border: 0,
    paddingBottom: 3,
    paddingLeft: 3,
    paddingRight: 3,
    paddingTop: 3
  },
  container: {
    borderRight: panelStyles.border,
    color: "#333333",
    cursor: "default",
    display: "inline-block",
    flex: "1 1 auto",
    ...fontStyles.default
  },
  flexContainer: {
    display: "flex",
    flexFlow: "row nowrap"
  },
  inactive: {
    backgroundColor: "#d4d4d4"
  },
  label: {
    display: "inline-block",
    marginRight: 10,
    paddingLeft: 15
  }
};
