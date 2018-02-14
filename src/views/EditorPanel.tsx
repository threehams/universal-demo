import * as React from "react";
import Radium from "radium";
import ReactMarkdown from "react-markdown";

import {
  MarkdownBlockQuote,
  MarkdownCode,
  MarkdownEmphasis,
  MarkdownHeading,
  MarkdownItem,
  MarkdownList,
  MarkdownParagraph,
  MarkdownStrong,
} from "../views/Markdown";
import { MarkdownLinkContainer } from "./MarkdownLink";

interface EditorPanelProps {
  history: string[];
}

export class EditorPanelBase extends React.Component<EditorPanelProps, {}> {
  private container: HTMLDivElement | null;

  public componentDidUpdate() {
    if (this.container) {
      this.container.scrollTop = this.container.scrollHeight;
    }
  }

  public render() {
    const { history } = this.props;
    const marginLeft = Math.ceil(
      Math.ceil((history.length + 1).toString().length) * 7.5,
    );
    const markdownProps = {
      className: "markdown",
      renderers: {
        BlockQuote: MarkdownBlockQuote,
        Code: MarkdownCode,
        Emph: MarkdownEmphasis,
        Heading: MarkdownHeading,
        Item: MarkdownItem,
        Link: MarkdownLinkContainer,
        List: MarkdownList,
        Paragraph: MarkdownParagraph,
        Strong: MarkdownStrong,
      },
      skipHtml: true,
    };
    const items = history.map((item, index) => {
      const trimmed = item ? item.trim() : "";
      return (
        <li key={index} style={styles.item}>
          <span style={[styles.counter, { width: marginLeft + 4 }]}>
            {index}
          </span>
          {trimmed ? (
            <ReactMarkdown source={trimmed} {...markdownProps} />
          ) : (
            "\u00a0"
          )}
        </li>
      );
    });
    return (
      <div
        style={[styles.container]}
        ref={container => {
          this.container = container;
        }}
      >
        <ol style={[styles.list, { marginLeft: marginLeft + 20 }]}>{items}</ol>
      </div>
    );
  }
}

export const EditorPanel = Radium(EditorPanelBase);

const styles = {
  container: {
    backgroundColor: "#f0f0f0",
    display: "flex",
    flex: "1 1 auto",
    flexFlow: "row nowrap",
    overflowY: "auto",
    position: "relative",
  },
  counter: {
    color: "#800000",
    cursor: "default",
    display: "inline-block",
    left: 0,
    position: "absolute",
    textAlign: "right",
  },
  item: {
    backgroundColor: "white",
    paddingLeft: 4,
  },
  list: {
    backgroundColor: "white",
    flex: "1 1 auto",
  },
};
