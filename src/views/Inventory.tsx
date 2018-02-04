import * as React from "react";
import { connect } from "react-redux";
import Radium = require("radium");

import * as editorActions from "../actions/editorActions";
import * as inventoryActions from "../actions/inventoryActions";
import { Loader } from "../components/Loader";
import { Entity, State } from "../models";
import * as inventorySelectors from "../selectors/inventorySelectors";
import { InventoryItem } from "./InventoryItem";

interface InventoryProps {
  addView: Function;
  items: Entity[];
  moveItem: Function;
  selectItem: Function;
  toggleExpand: Function;
  toggleItem: Function;
}

export const InventoryBase: React.StatelessComponent<InventoryProps> = ({
  addView,
  items,
  moveItem,
  selectItem,
  toggleExpand,
  toggleItem,
}) => (
  <div style={styles.container}>
    <Loader showUntil={!!items}>
      {items &&
        items.map(entity => {
          return (
            <InventoryItem
              key={entity.id}
              item={entity}
              addView={addView}
              moveItem={moveItem}
              selectItem={selectItem}
              toggleExpand={toggleExpand}
              toggleItem={toggleItem}
            />
          );
        })}
    </Loader>
  </div>
);

interface ConnectProps {
  owner: string;
}

export const Inventory = connect(
  (state: State, props: ConnectProps) => ({
    items: inventorySelectors.list(state).get(props.owner),
  }),
  {
    addView: editorActions.addView,
    moveItem: inventoryActions.moveItem,
    selectItem: inventoryActions.selectItem,
    toggleExpand: inventoryActions.toggleExpand,
    toggleItem: inventoryActions.toggleItem,
  },
)(Radium(InventoryBase));

const styles = {
  container: {
    overflowY: "auto",
  },
};
