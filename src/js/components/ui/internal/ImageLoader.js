// @flow
import autoBind from "auto-bind";
import React from "react";

const Status = {
  LOADING: "loading",
  LOADED: "loaded",
  FAILED: "failed",
  PENDING: "pending"
};

type Props = {
  className?: string;
  children?: React$Element<any>;
  wrapper: Function;
  src: string;
  background: boolean;
  preloader: React$Element<any>;
  onError?: Function;
  onLoad?: Function;
};

type State = {
  status: "loading" | "loaded" | "failed" | "pending";
};

export default class ImageLoader extends React.Component {
  props: Props;
  state: State;

  static defaultProps = {
    wrapper: React.DOM.span,
    background: false,
    onError: () => {},
    onLoad: () => {}
  };

  img: ?Image = null;

  constructor(props: Props, context: Object) {
    super(props, context);

    this.state = { status: props.src ? Status.LOADING : Status.PENDING };

    autoBind(this);
  }

  componentDidMount() {
    if (this.state.status === Status.LOADING) {
      this.createLoader();
    }
  }

  componentWillReceiveProps(nextProps: Props) {
    if (this.props.src !== nextProps.src) {
      this.setState({
        status: nextProps.src ? Status.LOADING : Status.PENDING
      });
    }
  }

  componentDidUpdate() {
    if (this.state.status === Status.LOADING && !this.img) {
      this.createLoader();
    }
  }

  componentWillUnmount() {
    this.destroyLoader();
  }

  handleLoaded(e: Event) {
    this.destroyLoader();
    this.setState({ status: Status.LOADED });
    if (typeof this.props.onLoad === "function") {
      this.props.onLoad(e);
    }
  }

  handleError(e: Event) {
    this.destroyLoader();
    this.setState({ status: Status.FAILED });
    if (typeof this.props.onError === "function") {
      this.props.onError(e);
    }
  }

  createLoader() {
    this.destroyLoader();

    this.img = new Image();
    this.img.onload = this.handleLoaded;
    this.img.onerror = this.handleError;
    this.img.src = this.props.src;
  }

  destroyLoader() {
    if (this.img) {
      this.img.onload = null;
      this.img.onerror = null;
      this.img = null;
    }
  }

  getClassName() {
    const { className } = this.props;
    const { status } = this.state;

    return className && className.trim().split(" ").map(str =>
      `${str} ${str}--${status}`
    ).join(" ");
  }

  render() {
    const {
      wrapper,
      children,
      src,
      preloader,
      background
    } = this.props;

    const { status } = this.state;

    const props = {
      className: this.getClassName()
    };

    switch (status) {
      case Status.LOADED:
        if (background) {
          return <span
            style={{ backgroundImage: `url(${src})` }}
            {...props}
          />;

        } else {
          return <img
            src={src}
            {...props}
          />;
        }

      case Status.FAILED:
        return wrapper({
          children,
          ...props
        });

      default:
        return preloader;
    }
  }
}
