import React, { CSSProperties } from "react";
import { connect } from "react-redux";
import Radium from "radium";
import { State } from "../models";

import { StatusEffect } from "../components/StatusEffect";

interface TerminalHistoryProps {
  history: string[];
}

export class TerminalHistoryBase extends React.Component<
  TerminalHistoryProps,
  {}
> {
  private container: HTMLDivElement;

  public componentDidUpdate() {
    this.container.scrollTop = this.container.scrollHeight;
  }

  public render() {
    const { history } = this.props;
    return (
      <div
        style={styles.container}
        ref={container => {
          this.container = container;
        }}
      >
        <ul style={styles.main}>
          {history.map((command, index) => {
            return (
              <li key={index}>
                <StatusEffect>{command}</StatusEffect>
              </li>
            );
          })}
        </ul>
      </div>
    );
  }
}

export const TerminalHistory = connect((state: State) => ({
  history: state.command.history,
}))(Radium(TerminalHistoryBase));

const styles: { [key: string]: CSSProperties } = {
  container: {
    flex: "1 1 auto",
    overflowY: "auto",
  },
  main: {
    padding: "4px 0 0 0",
  },
};
