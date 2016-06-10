import React, { PropTypes } from "react";
import bem from "../../../helpers/bem";
import bindHandlers from "../../../helpers/bind-handlers";

const b = bem("overlay");

export default class Overlay extends React.Component {
  static propTypes = {
    show: PropTypes.bool,
    onClick: PropTypes.func
  };

  static defaultProps = {
    show: false,
    onClick: () => {}
  };

  constructor(props) {
    super(props);

    bindHandlers([
      "handleClick"
    ], this);
  }

  componentDidMount() {
    this.updateScrollLock(this.props.show);
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.show !== this.props.show) {
      this.updateScrollLock(nextProps.show);
    }
  }

  componentWillUnmount() {
    this.unScrollLock();
  }

  handleClick(e) {
    e.stopPropagation();
    this.props.onClick();
  }

  updateScrollLock(isShow) {
    if (isShow) {
      this.scrollLock();
    } else {
      this.unScrollLock();
    }
  }

  scrollLock() {
    document.body.style.overflow = "hidden";
  }

  unScrollLock() {
    document.body.style.overflow = "";
  }

  render() {
    const { show } = this.props;

    return <div
      className={b({ show })}
      onClick={this.handleClick}
    />;
  }
}
