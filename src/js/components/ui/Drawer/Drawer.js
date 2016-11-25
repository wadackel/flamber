// @flow
import React from "react";
import EventListener from "react-event-listener";
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

  componentDidMount() {
    this.updateScrollHeight();
  }

  componentDidUpdate() {
    this.updateScrollHeight();
  }

  handleResize = () => {
    this.updateScrollHeight();
  }

  updateScrollHeight(): void {
    const { drawer, scrollContainer, footer } = this.refs;

    const { top, bottom } = drawer.getBoundingClientRect();
    const maxHeight = Math.min(bottom, window.innerHeight) - Math.max(0, top);
    const footerHeight = footer ? footer.offsetHeight : 0;

    scrollContainer.style.maxHeight = `${maxHeight - footerHeight}px`;
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
        <EventListener target="window" onResize={this.handleResize} />
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
