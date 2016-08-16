import autoBind from "auto-bind";
import React, { PropTypes } from "react";
import bem from "../../../helpers/bem";
import mergeClassNames from "../../../helpers/merge-class-names";
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
    autoBind(this);
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
    const { body, documentElement } = document;

    if (documentElement.clientWidth !== window.innerWidth) {
      body.style.paddingRight = `${this.scrollbarWidth}px`;
    }

    body.style.overflow = "hidden";
  }

  unScrollLock() {
    const { body } = document;
    body.style.paddingRight = "";
    body.style.overflow = "";
  }

  render() {
    const {
      className,
      show
    } = this.props;

    return <div
      className={mergeClassNames(b({ show })(), className)}
      onClick={this.handleClick}
    />;
  }
}
