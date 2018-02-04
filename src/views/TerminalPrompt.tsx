import * as React from "react";
import * as ReactDOM from "react-dom";
import { connect } from "react-redux";
import Radium = require("radium");

import * as commandActions from "../actions/commandActions";
import { AutocompleteItem, State } from "../models";
import * as autocompleteSelectors from "../selectors/autocompleteSelectors";
import panelStyles from "../styles/panel";
import { Autocomplete } from "./Autocomplete";

import fontStyles from "../styles/font";

interface TerminalPromptProps {
  autocompleteFragment: string;
  autocompleteOpen: boolean;
  autocompleteOptions: AutocompleteItem[];
  autocompletePosition: number;
  autocompleteSelectedItem: AutocompleteItem;
  closeAutocomplete: Function;
  completeCommand: Function;
  currentCommand: string;
  selectAutocompleteItem: Function;
  selectNextAutocompleteItem: Function;
  selectPreviousAutocompleteItem: Function;
  sendCommand: Function;
  setCurrentCommand: Function;
}

class TerminalPromptBase extends React.Component<TerminalPromptProps, {}> {
  private input: HTMLInputElement;

  public render() {
    const {
      autocompleteFragment,
      autocompleteOptions,
      autocompleteOpen,
      autocompletePosition,
      autocompleteSelectedItem,
      currentCommand,
      selectAutocompleteItem,
    } = this.props;

    const autocompleteStyles = {
      bottom: 30,
      left: Math.floor(autocompletePosition * fontStyles.widths.monospace),
    };
    return (
      <form onSubmit={this.submit.bind(this)}>
        {autocompleteOpen && (
          <div style={[styles.autocompleteContainer, autocompleteStyles]}>
            <Autocomplete
              fragment={autocompleteFragment}
              options={autocompleteOptions}
              selectedItem={autocompleteSelectedItem}
              onClickItem={selectAutocompleteItem}
            />
          </div>
        )}
        <input
          id="prompt"
          type="text"
          ref={input => {
            this.input = input;
          }}
          value={currentCommand}
          style={styles.input}
          onKeyDown={this.selectOption.bind(this)}
          onChange={this.setCommandFromInput.bind(this)}
          autoComplete="off"
        />
      </form>
    );
  }

  private setCommandFromInput(event: React.SyntheticEvent<HTMLInputElement>) {
    event.preventDefault();
    const cursorIndex: number = ReactDOM.findDOMNode<HTMLInputElement>(
      this.input,
    ).selectionStart;
    this.props.setCurrentCommand(event.currentTarget.value, cursorIndex);
  }

  // Intercept specific keystrokes and add special handling for autocomplete, or override browser defaults.
  private selectOption(event: React.KeyboardEvent<HTMLInputElement>) {
    const {
      autocompleteOptions,
      selectNextAutocompleteItem,
      autocompleteSelectedItem,
      selectPreviousAutocompleteItem,
      closeAutocomplete,
    } = this.props;
    if (event.key === "ArrowUp") {
      event.preventDefault();
      selectPreviousAutocompleteItem(
        autocompleteOptions,
        autocompleteSelectedItem,
      );
    } else if (event.key === "ArrowDown") {
      event.preventDefault();
      selectNextAutocompleteItem(autocompleteOptions, autocompleteSelectedItem);
    } else if (event.key === "Escape") {
      event.preventDefault();
      closeAutocomplete();
    }
  }

  // This does:
  // Based on current autocomplete open state:
  // - Open:   Based on the current command, fill in the command fragment with the selected autocomplete option.
  // - Closed: Send the command to the server.
  private submit(event: React.SyntheticEvent<HTMLFormElement>) {
    event.preventDefault();
    const {
      autocompleteOpen,
      autocompleteOptions,
      completeCommand,
      currentCommand,
      autocompleteSelectedItem,
      sendCommand,
    } = this.props;
    const cursorIndex = ReactDOM.findDOMNode<HTMLInputElement>(this.input)
      .selectionStart;
    if (autocompleteOpen && autocompleteOptions.length) {
      completeCommand(currentCommand, cursorIndex, autocompleteSelectedItem);
    } else {
      sendCommand(currentCommand);
    }
  }
}

const styles = {
  autocompleteContainer: {
    border: "1px solid #c0c0c0",
    maxHeight: 300,
    maxWidth: "70vw",
    overflowY: "scroll",
    position: "absolute",
    zIndex: 2,
  },
  input: Object.assign(
    {
      borderBottom: 0,
      borderLeft: 0,
      borderRight: 0,
      borderTop: panelStyles.border,
      outline: 0,
      padding: 4,
      width: "100%",
    },
    fontStyles.monospace,
  ),
};

export const TerminalPrompt = connect(
  (state: State) => ({
    autocompleteFragment: autocompleteSelectors.autocompleteFragment(state),
    autocompleteOpen: state.command.autocompleteOpen,
    autocompleteOptions: autocompleteSelectors.availableOptions(state),
    autocompletePosition: state.command.autocompletePosition,
    autocompleteSelectedItem: autocompleteSelectors.selectedOption(state),
    currentCommand: state.command.current,
  }),
  {
    closeAutocomplete: commandActions.closeAutocomplete,
    completeCommand: commandActions.completeCommand,
    selectAutocompleteItem: commandActions.selectAutocompleteItem,
    selectNextAutocompleteItem: commandActions.selectNextAutocompleteItem,
    selectPreviousAutocompleteItem:
      commandActions.selectPreviousAutocompleteItem,
    sendCommand: commandActions.sendCommand,
    setCurrentCommand: commandActions.setCurrentCommand,
  },
)(Radium(TerminalPromptBase));
