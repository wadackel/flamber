// @flow
import autoBind from "auto-bind";
import React from "react";
import IScroll from "../../../utils/iscroll";
import bem from "../../../helpers/bem";
import mergeClassNames from "../../../helpers/merge-class-names";

const b = bem("drawer");

type Props = {
  children?: React$Element<any>;
  className?: string;
  direction: "right" | "left";
  open: boolean;
  footer?: React$Element<any>;
};

export default class Drawer extends React.Component {
  props: Props;

  static defaultProps = {
    direction: "left",
    open: false
  };

  iScroll: ?IScroll = null;

  constructor(props: Props, context: Object) {
    super(props, context);
    autoBind(this);
  }

  componentDidMount() {
    this.iScroll = new IScroll(this.refs.scrollContainer, {
      bounce: false,
      mouseWheel: true,
      scrollbars: "custom",
      freeScroll: false,
      click: true,
      preventDefault: false
    });

    this.updateScrollHeight();
    window.addEventListener("resize", this.handleResize, false);
  }

  componentDidUpdate() {
    this.updateScrollHeight();
  }

  componentWillUnmount() {
    window.removeEventListener("resize", this.handleResize, false);
  }

  handleResize() {
    this.updateScrollHeight();
  }

  updateScrollHeight(): void {
    const {
      drawer,
      scrollContainer,
      footer
    } = this.refs;

    const { top, bottom } = drawer.getBoundingClientRect();
    const maxHeight = Math.min(bottom, window.innerHeight) - Math.max(0, top);
    const footerHeight = footer ? footer.offsetHeight : 0;

    if (this.iScroll) {
      scrollContainer.style.maxHeight = `${maxHeight - footerHeight}px`;
      this.iScroll.refresh();
    }
  }

  render() {
    const {
      children,
      className,
      direction,
      open,
      footer
    } = this.props;

    const modifier = {
      [direction]: true,
      open
    };

    const footerElement = footer && <div ref="footer" className={b("footer")()}>{footer}</div>;

    return (
      <div ref="drawer" className={mergeClassNames(b(modifier)(), className)}>
        <div ref="scrollContainer" className={b("scroll-container")()}>
          <div className={b("container")()}>
            {children}
          </div>
        </div>
        {footerElement}
      </div>
    );
  }
}
