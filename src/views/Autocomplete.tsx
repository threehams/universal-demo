import React, { CSSProperties } from "react";
import { pure, withHandlers } from "recompose";

import { AutocompleteItem } from "../models";
import { StatusEffect } from "../components/StatusEffect";

export function splitOption(option: string, fragment: string) {
  const parts = option.split(fragment);
  return [parts[0], fragment, parts.slice(1).join(fragment)];
}

interface AutocompleteBaseProps {
  fragment: string;
  focused?: boolean;
  options: AutocompleteItem[];
  onClickItem: Function;
  selectedItem: AutocompleteItem;
}

export class AutocompleteBase extends React.Component<
  AutocompleteBaseProps,
  {}
> {
  private selectedItem: HTMLLIElement;

  public componentDidUpdate() {
    if (this.selectedItem) {
      this.selectedItem.scrollIntoView(false);
    }
  }

  public render() {
    const {
      fragment,
      focused,
      onClickItem,
      options,
      selectedItem,
    } = this.props;
    if (!options || !options.length) {
      return (
        <ul style={styles.panel.global} tabIndex={1000}>
          <li style={styles.item.global}>(no suggestions found)</li>
        </ul>
      );
    }

    return (
      <ul style={styles.panel.global} tabIndex={1000}>
        {options.map((option, index) => {
          const optionSplit = splitOption(option.name, fragment);
          const path = option.path ? ` (${option.path})` : "";
          return (
            <li
              key={index}
              style={{
                ...styles.item.global,
                ...(focused ? styles.item.focused : styles.item.unfocused),
                ...(option === selectedItem
                  ? styles.itemSelected.unfocused
                  : {}),
              }}
              ref={item => {
                if (option === selectedItem) {
                  this.selectedItem = item;
                }
              }}
              onClick={() => onClickItem(option)}
            >
              <StatusEffect>{optionSplit[0]}</StatusEffect>
              <span
                style={
                  focused
                    ? styles.selectedPart.focused
                    : styles.selectedPart.unfocused
                }
              >
                <StatusEffect>{optionSplit[1]}</StatusEffect>
              </span>
              <StatusEffect>{`${optionSplit[2]}${path}`}</StatusEffect>
            </li>
          );
        })}
      </ul>
    );
  }
}

export const Autocomplete = withHandlers<
  AutocompleteBaseProps,
  AutocompleteBaseProps
>({})(pure(AutocompleteBase));

const styles: { [key: string]: CSSProperties } = {
  footer: {
    backgroundColor: "#e8e8e8",
    color: "black",
  },
  item: {
    focused: {
      color: "black",
    },
    global: {
      cursor: "default",
      padding: "6px 8px 3px",
    },
    unfocused: {
      color: "#5e6266",
    },
  },
  itemSelected: {
    focused: {
      backgroundColor: "#0052a4",
      color: "white",
    },
    unfocused: {
      backgroundColor: "#a0b7c7",
    },
  },
  panel: {
    global: {
      backgroundColor: "#ebf4fe",
    },
  },
  selectedPart: {
    focused: {
      color: "white",
    },
    unfocused: {
      color: "#c862d0",
    },
  },
};
