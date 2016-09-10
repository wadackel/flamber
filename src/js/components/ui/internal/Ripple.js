import autoBind from "auto-bind";
import React, { PropTypes } from "react";
import shareConfig from "../../../share-config.json";

const RIPPLE_DURATION = shareConfig["ripple-duration"];

export default class Ripple extends React.Component {
  static propTypes = {
    className: PropTypes.string,
    style: PropTypes.object,
    onRequestHide: PropTypes.func
  };

  static defaultProps = {
    className: "",
    style: {},
    onRequestHide: () => {}
  };

  constructor(props, context) {
    super(props, context);

    this.state = {
      show: true
    };

    this.timer = null;

    autoBind(this);
  }

  componentDidMount() {
    this.timer = setTimeout(this.handleTimeout, RIPPLE_DURATION);
  }

  componentWillUnmount() {
    clearTimeout(this.timer);
    this.timer = null;
    this.setState({ show: true });
  }

  handleTimeout() {
    clearTimeout(this.timer);
    this.timer = null;
    this.setState({ show: false });
    this.props.onRequestHide();
  }

  render() {
    const {
      className,
      style
    } = this.props;

    const {
      show
    } = this.state;

    if (!show) return null;

    return (
      <div className={className} style={style}></div>
    );
  }
}
