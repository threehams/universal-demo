import { connect } from "react-redux";

import * as commandActions from "../actions/commandActions";
import * as playerActions from "../actions/playerActions";
import { MarkdownLink } from "./Markdown";

export const MarkdownLinkContainer = connect(null, {
  attack: playerActions.attack,
  locateItem: playerActions.locateItem,
  move: commandActions.sendCommand,
})(MarkdownLink);
