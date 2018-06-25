import React from "react";
import { Fragment } from "../components/Fragment";
import universal from "react-universal-component";

interface Props {
  page: string;
}
const Universal = universal((props: Props) => import(`./${props.page}`));

// this has to be a class or DragDropContext will throw errors
export const App = () => {
  return (
    <>
      <Fragment forRoute="/">
        <Universal page="Home" />
      </Fragment>
      <Fragment forRoute="/about">
        <Universal page="About" />
      </Fragment>
    </>
  );
};
