import React from "react";
import Radium from "radium";
import { connect } from "react-redux";

import { Icon, Panel, PanelContainer, Tab, TabContainer } from "../components/";
import { StatusEffect } from "../components/StatusEffect";
import { State } from "../models";
import { Editor } from "./Editor";
import { Inventory } from "./Inventory";
import { Player } from "./Player";
import { Terminal } from "./Terminal";

import * as layoutActions from "../actions/layoutActions";
import * as playerActions from "../actions/playerActions";

interface LayoutProps {
  activePlayerView: "inventory" | "character";
  alert: string;
  footerHeight: number;
  resizePanel: Function;
  setActiveView: Function;
  sidebarHeight: number;
  sidebarWidth: number;
}

export const LayoutBase: React.StatelessComponent<LayoutProps> = ({
  activePlayerView,
  alert,
  footerHeight,
  resizePanel,
  setActiveView,
  sidebarHeight,
  sidebarWidth,
}) => (
  <div>
    {alert && <div style={styles.alert}>{alert}</div>}
    <PanelContainer
      footerHeight={footerHeight}
      sidebarHeight={sidebarHeight}
      sidebarWidth={sidebarWidth}
      resizePanel={resizePanel}
    >
      <Panel type="sidebar" key="sidebar-upper">
        <TabContainer equalWidth>
          <Tab
            onClick={() => setActiveView("inventory")}
            active={activePlayerView === "inventory"}
          >
            <StatusEffect>
              <Icon name="fa fa-folder-o" before />
              <StatusEffect>Inventory</StatusEffect>
            </StatusEffect>
          </Tab>
          <Tab
            onClick={() => setActiveView("character")}
            active={activePlayerView === "character"}
          >
            <StatusEffect>
              <Icon name="fa fa-user" before />
              <StatusEffect>Character</StatusEffect>
            </StatusEffect>
          </Tab>
        </TabContainer>
        {activePlayerView === "inventory" && <Inventory owner={"self"} />}
        {activePlayerView === "character" && <Player />}
      </Panel>
      <Panel type="sidebar" key="sidebar-lower">
        <TabContainer>
          <Tab active>
            <StatusEffect>Floor</StatusEffect>
          </Tab>
        </TabContainer>
        <Inventory owner={"floor"} />
      </Panel>

      <Panel type="main" key="main">
        <Editor />
      </Panel>

      <Panel type="footer" key="footer">
        <Terminal />
      </Panel>
    </PanelContainer>
  </div>
);

export const Layout = connect(
  (state: State) => ({
    activePlayerView: state.ui.activePlayerView,
    alert: state.ui.alert,
    footerHeight: state.ui.footerHeight,
    sidebarHeight: state.ui.sidebarHeight,
    sidebarWidth: state.ui.sidebarWidth,
  }),
  {
    resizePanel: layoutActions.resizePanel,
    setActiveView: playerActions.setActiveView,
  },
)(Radium(LayoutBase));

const styles = {
  alert: {
    backgroundColor: "red",
    color: "white",
    padding: 10,
    position: "absolute",
    textAlign: "center",
    width: "100%",
    zIndex: 1,
  },
};
