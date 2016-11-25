// @flow
import React, { Component } from "react";
import shareConfig from "../../../share-config.json";

const RIPPLE_DURATION = shareConfig["ripple-duration"];

type Props = {
  className: string;
  style: Object;
  onRequestHide: Function;
};

type State = {
  show: boolean;
};

export default class Ripple extends Component {
  props: Props;
  state: State = {
    show: true
  };

  static defaultProps = {
    className: "",
    style: {},
    onRequestHide: () => {}
  };

  timer: ?number = null;

  componentDidMount() {
    this.timer = setTimeout(this.handleTimeout, RIPPLE_DURATION);
  }

  componentWillUnmount() {
    clearTimeout(this.timer);
    this.timer = null;
    this.setState({ show: true });
  }

  handleTimeout = () => {
    clearTimeout(this.timer);
    this.timer = null;
    this.setState({ show: false });
    this.props.onRequestHide();
  }

  render() {
    const { className, style } = this.props;
    const { show } = this.state;

    if (!show) return null;

    return (
      <div className={className} style={style}></div>
    );
  }
}
