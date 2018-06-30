import React from "react";
import universal from "react-universal-component";
import { RouteSwitch } from "../views/RouteSwitch";

interface Props {
  page: string;
}
const Universal = universal((props: Props) => import(`./${props.page}`));

// this has to be a class or DragDropContext will throw errors
export const App = () => {
  return <RouteSwitch />;
};
