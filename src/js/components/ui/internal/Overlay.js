// @flow
import React, { Component } from "react";
import bem from "../../../helpers/bem";
import mergeClassNames from "../../../helpers/merge-class-names";
import measureScrollbarWidth from "../../../utils/measure-scrollbar-width";

const b = bem("overlay");

type Props = {
  className?: string;
  style?: Object;
  show: boolean;
  onClick?: Function;
};

export default class Overlay extends Component {
  props: Props;

  static defaultProps = {
    show: false,
    onClick: () => {}
  };

  scrollbarWidth: number = 0;

  componentWillMount() {
    this.scrollbarWidth = measureScrollbarWidth();
  }

  componentDidMount() {
    this.updateScrollLock(this.props.show);
  }

  componentWillReceiveProps(nextProps: Props) {
    if (nextProps.show !== this.props.show) {
      this.updateScrollLock(nextProps.show);
    }
  }

  componentWillUnmount() {
    this.unScrollLock();
  }

  handleClick = (e: SyntheticMouseEvent) => {
    e.stopPropagation();
    if (typeof this.props.onClick === "function") {
      this.props.onClick();
    }
  }

  updateScrollLock(isShow: boolean): void {
    if (isShow) {
      this.scrollLock();
    } else {
      this.unScrollLock();
    }
  }

  scrollLock(): void {
    const { body, documentElement } = document;

    if (documentElement.clientWidth !== window.innerWidth) {
      body.style.paddingRight = `${this.scrollbarWidth}px`;
    }

    body.style.overflow = "hidden";
  }

  unScrollLock(): void {
    const { body } = document;
    body.style.paddingRight = "";
    body.style.overflow = "";
  }

  render() {
    const {
      className,
      style,
      show
    } = this.props;

    return <div
      className={mergeClassNames(b({ show })(), className)}
      style={style}
      onClick={this.handleClick}
    />;
  }
}
