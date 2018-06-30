import React from "react";
import { connect } from "react-redux";
import universal from "react-universal-component";

import { State, Page } from "../types";

interface Props {
  page: Page;
}

const Universal = universal((props: Props) => import(`./${props.page}`));

export const RouteSwitchBase = ({ page }: Props) => {
  return <Universal page={page} />;
};

export const RouteSwitch = connect(
  (state: State) => ({
    page: state.page,
  }),
  {},
)(RouteSwitchBase);
