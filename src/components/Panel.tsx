import * as React from "react";
import Radium from "radium";

interface PanelProps {
  type: string;
  style?: Object | Object[];
}

const PanelBase: React.StatelessComponent<PanelProps> = ({
  children,
  style,
}) => <div style={style}>{children}</div>;

export const Panel = Radium(PanelBase);
