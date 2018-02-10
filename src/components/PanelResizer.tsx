import * as React from "react";
import Radium from "radium";

const coords = {
  bottom: "clientY",
  left: "clientX",
  right: "clientX",
  top: "clientY",
};

const multiplier = {
  bottom: 1,
  left: -1,
  right: 1,
  top: -1,
};

interface PanelResizerProps {
  onResize: Function;
  position: "top" | "bottom" | "left" | "right";
  propertyName: string;
}

interface PanelResizerState {
  resizing: boolean;
  initial?: number;
}

export class PanelResizerBase extends React.Component<
  PanelResizerProps,
  PanelResizerState
> {
  constructor(props: PanelResizerProps) {
    super(props);

    this.state = {
      resizing: false,
    };
    this.resize = this.resize.bind(this);
    this.endResize = this.endResize.bind(this);
  }

  // public shouldComponentUpdate(
  //   nextProps: PanelResizerProps,
  //   nextState: PanelResizerState
  // ) {
  //   /* istanbul-ignore-next */
  //   return shallowCompare(this, nextProps, nextState);
  // }

  public componentDidMount() {
    window.addEventListener("mousemove", this.resize);
    window.addEventListener("mouseup", this.endResize);
  }

  public componentWillUnmount() {
    window.removeEventListener("mousemove", this.resize);
    window.removeEventListener("mouseup", this.endResize);
  }

  public render() {
    const { position } = this.props;
    return (
      <div style={styles[position]} onMouseDown={this.startResize.bind(this)} />
    );
  }

  private startResize(event: React.MouseEvent<HTMLDivElement>) {
    event.preventDefault();
    this.setState({
      initial: event[coords[this.props.position]],
      resizing: true,
    });
  }

  private resize(event: MouseEvent) {
    if (!this.state.resizing) {
      return;
    }

    event.preventDefault();
    this.props.onResize(
      this.props.propertyName,
      (event[coords[this.props.position]] - this.state.initial) *
        multiplier[this.props.position],
    );
  }

  private endResize(event: Event) {
    if (!this.state.resizing) {
      return;
    }

    event.preventDefault();
    this.props.onResize(this.props.propertyName, null, true);
    this.setState({ initial: 0, resizing: false });
  }
}

export const PanelResizer = Radium(PanelResizerBase);

const styles = {
  right: {
    cursor: "ew-resize",
    height: "100%",
    position: "absolute",
    right: -5,
    top: 0,
    width: 11,
    zIndex: 1,
  },
  top: {
    cursor: "ns-resize",
    height: 11,
    left: 0,
    position: "absolute",
    top: -5,
    width: "100%",
    zIndex: 1,
  },
};
