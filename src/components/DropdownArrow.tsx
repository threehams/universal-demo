import * as React from "react";

import { Icon } from "./Icon";

interface DropdownArrowProps {
  expanded?: boolean;
  onMouseDown?: Function;
  style?: Object;
}

export const DropdownArrow: React.StatelessComponent<DropdownArrowProps> = ({
  expanded,
  ...rest
}) => (
  <Icon
    {...rest}
    name={expanded ? "icon-arrow-down" : "icon-arrow-right"}
    before
  />
);
