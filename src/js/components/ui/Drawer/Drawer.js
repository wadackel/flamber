import React, { PropTypes } from "react";
import IScroll from "iscroll";
import bem from "../../../helpers/bem";
import mergeClassNames from "../../../helpers/merge-class-names";
import bindHandlers from "../../../helpers/bind-handlers";

const b = bem("drawer");

export default class Drawer extends React.Component {
  static propTypes = {
    children: PropTypes.node,
    className: PropTypes.string,
    direction: PropTypes.oneOf(["left", "right"]),
    open: PropTypes.bool,
    footer: PropTypes.node
  };

  static defaultProps = {
    direction: "left",
    open: false
  };

  constructor(props) {
    super(props);

    bindHandlers([
      "handleResize"
    ], this);
  }

  componentDidMount() {
    this.iscroll = new IScroll(this.refs.scrollContainer, {
      bounce: false,
      mouseWheel: true,
      scrollbars: "custom",
      freeScroll: true,
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

  updateScrollHeight() {
    const {
      drawer,
      scrollContainer,
      footer
    } = this.refs;

    const { top, bottom } = drawer.getBoundingClientRect();
    const maxHeight = Math.min(bottom, window.innerHeight) - Math.max(0, top);
    const footerHeight = footer ? footer.offsetHeight : 0;

    scrollContainer.style.maxHeight = `${maxHeight - footerHeight}px`;

    this.iscroll.refresh();
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

    const footerElement = footer && <div ref="footer" className={b("footer")}>{footer}</div>;

    return (
      <div ref="drawer" className={mergeClassNames(b(modifier), className)}>
        <div ref="scrollContainer" className={b("scroll-container")}>
          <div className={b("container")}>
            {children}
          </div>
        </div>
        {footerElement}
      </div>
    );
  }
}
