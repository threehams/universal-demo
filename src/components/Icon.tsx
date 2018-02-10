import * as React from "react";
import Radium from "radium";

interface IconProps {
  name: string;
  before?: boolean;
  style?: Object;
  // TODO type this better, now that spread/rest work
}

export const IconBase: React.StatelessComponent<IconProps> = ({
  name,
  before,
  style,
}) => (
  <i
    className={`${name}`}
    style={[style, styles.all, before && styles.before]}
  />
);

const styles = {
  all: {
    display: "inline-block",
  },
  before: {
    marginRight: 6,
  },
};

export const Icon = Radium(IconBase);
