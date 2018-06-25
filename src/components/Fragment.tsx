import React from "react";
import {
  Fragment as OriginalFragment,
  FragmentProps,
  Location,
} from "redux-little-router";

interface Props extends FragmentProps {
  /*
   * Render fragment on a partial match. Example:
   * 
   * <Fragment forRoute="/about" partial>
   * matches "/about" and "/about-us"
   * 
   */
  partial?: boolean;
  forRoute?: string;
}

export const Fragment: React.SFC<Props> = ({ partial, forRoute, ...rest }) => {
  let props;
  if (partial) {
    props = { forRoute };
  } else {
    props = {
      withConditions: (location: Location) => location.pathname === forRoute,
    };
  }

  return <OriginalFragment {...rest} {...props} />;
};
