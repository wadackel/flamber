import React, { PropTypes } from "react";
import bem from "../../../helpers/bem";
import mergeClassNames from "../../../helpers/merge-class-names";
import bindHandlers from "../../../helpers/bind-handlers";
import measureScrollbarWidth from "../../../utils/measure-scrollbar-width";

const b = bem("overlay");

export default class Overlay extends React.Component {
  static propTypes = {
    className: PropTypes.string,
    show: PropTypes.bool,
    onClick: PropTypes.func
  };

  static defaultProps = {
    show: false,
    onClick: () => {}
  };

  constructor(props, context) {
    super(props, context);

    bindHandlers([
      "handleClick"
    ], this);
  }

  componentWillMount() {
    this.scrollbarWidth = measureScrollbarWidth();
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
    const { body } = document;
    body.style.overflow = "hidden";
    body.style.paddingRight = `${this.scrollbarWidth}px`;
  }

  unScrollLock() {
    const { body } = document;
    body.style.overflow = "";
    body.style.paddingRight = "";
  }

  render() {
    const {
      className,
      show
    } = this.props;

    return <div
      className={mergeClassNames(b({ show }), className)}
      onClick={this.handleClick}
    />;
  }
}
