import * as React from "react";
import Radium from "radium";
import { connect } from "react-redux";

import { Icon } from "../components/Icon";
import { StatusEffect } from "../components/StatusEffect";
import { Entity, State } from "../models";

interface PlayerProps {
  player: Entity;
}

export const PlayerBase: React.StatelessComponent<PlayerProps> = ({
  player,
}) => (
  <div style={styles.container}>
    <ul style={styles.left}>
      <li>
        <StatusEffect>Health</StatusEffect>
      </li>
      <li>
        <StatusEffect>Memory</StatusEffect>
      </li>
      <li>
        <StatusEffect>Storage</StatusEffect>
      </li>
    </ul>
    <ul style={styles.right}>
      <li>
        <Icon name="heart-o" before />
        {player.currentHealth} / {player.maxHealth}
      </li>
      <li>
        <Icon name="hdd-o" before />
        {player.currentStorage} / {player.maxStorage}
      </li>
    </ul>
  </div>
);

export const Player = connect((state: State) => ({
  player: state.entities[state.ui.player],
}))(Radium(PlayerBase));

const styles = {
  container: {
    padding: 4,
  },
  left: {
    display: "inline-block",
    width: "34%",
  },
  right: {
    display: "inline-block",
    width: "66%",
  },
};
