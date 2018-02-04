import * as React from "react";
import Radium = require("radium");

import { Icon } from "../components/Icon";

export const TYPE_ICONS = {
  container: "icon-folder",
  containerClosed: "icon-folder-excluded",
  creature: "fa fa-github-alt",
  executable: "icon-file-js",
  locked: "icon-locked",
  player: "fa fa-user",
  room: "fa fa-photo",
  text: "icon-file-text",
  unlocked: "icon-unlocked",
};

interface EntityIconProps {
  components?: string[];
  states?: string[];
  style?: Object;
  before?: boolean;
}

function iconFor(components: string[], states: string[]) {
  if (states.includes("locked")) {
    return TYPE_ICONS.locked;
  }
  if (states.includes("unlocked") && states.includes("closed")) {
    return TYPE_ICONS.unlocked;
  }
  if (components.includes("openable") && states.includes("closed")) {
    return TYPE_ICONS.containerClosed;
  }
  for (const component of ["container", "player", "room", "creature"]) {
    if (components.includes(component)) {
      return TYPE_ICONS[component];
    }
  }
  return TYPE_ICONS.text;
}

export const EntityIconBase: React.StatelessComponent<EntityIconProps> = ({
  components = [],
  states = [],
  ...rest
}) => <Icon {...rest} name={iconFor(components, states)} />;

export const EntityIcon = Radium(EntityIconBase);
