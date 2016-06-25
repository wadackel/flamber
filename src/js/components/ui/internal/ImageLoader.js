import React, { PropTypes } from "react";
import ReactDOM from "react-dom";
import bindHandlers from "../../../helpers/bind-handlers";

const Status = {
  LOADING: "loading",
  LOADED: "loaded",
  FAILED: "failed"
};

export default class ImageLoader extends React.Component {
  static propTypes = {
    wrapper: PropTypes.func,
    children: PropTypes.node,
    className: PropTypes.string,
    src: PropTypes.string,
    background: PropTypes.bool,
    preloader: PropTypes.element,
    onError: PropTypes.func,
    onLoad: PropTypes.func
  };

  static defaultProps = {
    wrapper: ReactDOM.span,
    background: false,
    onError: () => {},
    onLoad: () => {}
  };

  constructor(props) {
    super(props);

    this.state = { status: props.src ? Status.LOADING : Status.PENDING };

    bindHandlers([
      "handleLoaded",
      "handleError"
    ], this);
  }

  componentDidMount() {
    if (this.state.status === Status.LOADING) {
      this.createLoader();
    }
  }

  componentWillReceiveProps(nextProps) {
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

  handleLoaded(e) {
    this.destroyLoader();
    this.setState({ status: Status.LOADED });
    this.props.onLoad(e);
  }

  handleError(e) {
    this.destroyLoader();
    this.setState({ status: Status.FAILED });
    this.props.onError(e);
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
