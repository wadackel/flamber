/* eslint-disable */
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

    this.state = {
    };

    bindHandlers([
    ], this);
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

    const footerElement = footer && <div className={b("footer")}>
    </div>;

    return (
      <div className={mergeClassNames(b(modifier), className)}>
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
