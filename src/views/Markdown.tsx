import React, { CSSProperties } from "react";
import { StatusEffect } from "../components/StatusEffect";

import colors from "../styles/colors";
import fontStyles from "../styles/font";

interface MarkdownLinkProps {
  href: string;
  title: string;
  move: Function;
  attack: Function;
  locateItem: Function;
}

export class MarkdownLink extends React.Component<MarkdownLinkProps, {}> {
  // public shouldComponentUpdate(nextProps: MarkdownLinkProps, nextState: {}) {
  //   /* istanbul-ignore-next */
  //   return shallowCompare(this, nextProps, nextState);
  // }

  public render() {
    const { href, children } = this.props;
    return (
      <a href={href} onClick={this.onClick.bind(this)}>
        {<StatusEffect>{children}</StatusEffect>}
      </a>
    );
  }

  private onClick(event: React.MouseEvent<HTMLAnchorElement>) {
    event.preventDefault();
    const { href } = this.props;
    const [route, id] = href.split("/").slice(1);
    switch (route) {
      case "exits":
        return this.props.move(id);
      case "creatures":
        return this.props.attack(id);
      case "items":
        return this.props.locateItem(id);
      default:
        throw new Error(`Cannot handle route: ${route}`);
    }
  }
}

export class MarkdownHeading extends React.Component<{}, {}> {
  // public shouldComponentUpdate(nextProps: {}, nextState: {}) {
  //   /* istanbul-ignore-next */
  //   return shallowCompare(this, nextProps, nextState);
  // }

  public render() {
    return (
      <StatusEffect>
        {[this.props.children, <div key="underline">---------------</div>]}
      </StatusEffect>
    );
  }
}

export class MarkdownParagraph extends React.Component<{}, {}> {
  // public shouldComponentUpdate(nextProps: {}, nextState: {}) {
  //   /* istanbul-ignore-next */
  //   return shallowCompare(this, nextProps, nextState);
  // }

  public render() {
    return <StatusEffect>{this.props.children}</StatusEffect>;
  }
}

export class MarkdownList extends React.Component<{}, {}> {
  // public shouldComponentUpdate(nextProps: {}, nextState: {}) {
  //   /* istanbul-ignore-next */
  //   return shallowCompare(this, nextProps, nextState);
  // }

  public render() {
    return <ul>{this.props.children}</ul>;
  }
}

export class MarkdownItem extends React.Component<{}, {}> {
  // public shouldComponentUpdate(nextProps: {}, nextState: {}) {
  //   /* istanbul-ignore-next */
  //   return shallowCompare(this, nextProps, nextState);
  // }

  public render() {
    return (
      <li>
        <StatusEffect>- {this.props.children}</StatusEffect>
      </li>
    );
  }
}

export class MarkdownCode extends React.Component<{}, {}> {
  // public shouldComponentUpdate(nextProps: {}, nextState: {}) {
  //   /* istanbul-ignore-next */
  //   return shallowCompare(this, nextProps, nextState);
  // }

  public render() {
    return (
      <code style={{ ...styles.all, ...styles.code }}>
        <StatusEffect>
          <span style={styles.codeMarker}>|</span> {this.props.children}
        </StatusEffect>
      </code>
    );
  }
}

export class MarkdownEmphasis extends React.Component<{}, {}> {
  // public shouldComponentUpdate(nextProps: {}, nextState: {}) {
  //   /* istanbul-ignore-next */
  //   return shallowCompare(this, nextProps, nextState);
  // }

  public render() {
    return (
      <em style={Object.assign({}, styles.all, styles.em)}>
        <StatusEffect>{this.props.children}</StatusEffect>
      </em>
    );
  }
}

export class MarkdownStrong extends React.Component<{}, {}> {
  // public shouldComponentUpdate(nextProps: {}, nextState: {}) {
  //   /* istanbul-ignore-next */
  //   return shallowCompare(this, nextProps, nextState);
  // }

  public render() {
    return (
      <strong style={Object.assign({}, styles.all, styles.strong)}>
        <StatusEffect>{this.props.children}</StatusEffect>
      </strong>
    );
  }
}

export class MarkdownBlockQuote extends React.Component<{}, {}> {
  // public shouldComponentUpdate(nextProps: {}, nextState: {}) {
  //   /* istanbul-ignore-next */
  //   return shallowCompare(this, nextProps, nextState);
  // }

  public render() {
    return (
      <blockquote style={{ ...styles.all, ...styles.blockquote }}>
        <StatusEffect>"{this.props.children}"</StatusEffect>
      </blockquote>
    );
  }
}

const styles: { [key: string]: CSSProperties } = {
  all: {
    fontStyle: "normal",
    fontWeight: "normal",
  },
  blockquote: {
    color: colors.variable,
    display: "inline-block",
    marginLeft: Math.floor(fontStyles.widths.monospace * 2),
  },
  code: {
    color: colors.string,
    display: "inline-block",
    paddingLeft: Math.floor(fontStyles.widths.monospace * 2),
    position: "relative",
  },
  codeMarker: {
    left: 0,
    position: "absolute",
  },
  em: {
    color: colors.variable,
  },
  strong: {
    color: colors.property,
  },
};
