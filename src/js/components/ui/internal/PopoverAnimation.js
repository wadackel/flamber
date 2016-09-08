const IScroll = typeof window !== "undefined" ? require("iscroll") : null;

import _ from "lodash";
import React, { PropTypes } from "react";
import * as OriginalPropTypes from "../../../constants/prop-types";
import prefixer from "../../../helpers/prefixer";
import bem from "../../../helpers/bem";
import mergeClassNames from "../../../helpers/merge-class-names";

export default class PopoverAnimation extends React.Component {
  static propTypes = {
    children: PropTypes.node,
    className: PropTypes.string,
    baseClassName: PropTypes.string,
    open: PropTypes.bool,
    origin: OriginalPropTypes.origin
  };

  static contextTypes = {
    theme: PropTypes.string.isRequired
  };

  constructor(props, context) {
    super(props, context);
    this.state = { open: false };
  }

  shouldComponentUpdate(nextProps, nextState) {
    return !_.isEqual(this.props, nextProps) || !_.isEqual(this.state, nextState);
  }

  componentDidMount() {
    this.setState({ open: true }); // eslint-disable-line react/no-did-mount-set-state
  }

  componentDidUpdate() {
    const { origin } = this.props;
    const { scrollContainer } = this.refs;
    scrollContainer.style.maxHeight = "";

    const { top } = scrollContainer.getBoundingClientRect();
    const height = scrollContainer.offsetHeight;
    const viewportHeight = window.innerHeight;
    const margin = 10;
    const maxHeight = origin.vertical === "top" ? viewportHeight - top - margin : viewportHeight - margin;

    if (maxHeight > 0 && maxHeight < height) {
      scrollContainer.style.maxHeight = `${maxHeight}px`;
      this.scrollable = true;
    } else {
      this.scrollable = false;
    }

    this.updateScroll();
  }

  componentWillReceiveProps(nextProps) {
    this.setState({ open: nextProps.open });
  }

  componentWillUnmount() {
    if (this.iscroll) {
      this.iscroll.destroy();
      this.iscroll = null;
    }
  }

  updateScroll() {
    // FIXME: Directly specified DOM of the class name.
    const { scrollContainer } = this.refs;

    if (!this.iscroll) {
      if (this.scrollable) {
        this.iscroll = new IScroll(scrollContainer, {
          bounce: false,
          mouseWheel: true,
          scrollbars: "custom",
          preventDefault: false
        });

        const selectedItem = scrollContainer.querySelector(".menu-item--selected");
        if (selectedItem) {
          this.iscroll.scrollToElement(selectedItem, 0);
        }
      }

    } else {
      this.iscroll.refresh();
    }
  }

  render() {
    const {
      children,
      className,
      baseClassName,
      origin
    } = this.props;

    const { theme } = this.context;

    const b = bem(baseClassName);
    const modifier = { open: this.state.open, theme };

    const originVertical = origin.vertical === "middle" ? "50%" : origin.vertical;
    const originHorizontal = origin.horizontal === "center" ? "50%" : origin.horizontal;
    const transformOrigin = `${originHorizontal} ${originVertical}`;
    const style = prefixer.prefix({ transformOrigin });

    return (
      <div
        ref="popover"
        className={mergeClassNames(b(modifier)(), className)}
        style={style}
      >
        <div className={b("horizontal", modifier)()} style={style}>
          <div className={b("vertical", modifier)()} style={style}>
            <div ref="scrollContainer" className={b("scroll-container", modifier)()}>
              {children}
            </div>
          </div>
        </div>
      </div>
    );
  }
}
