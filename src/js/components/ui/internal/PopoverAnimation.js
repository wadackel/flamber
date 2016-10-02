// @flow
import _ from "lodash";
import React, { Component, PropTypes } from "react";
import IScroll from "../../../utils/iscroll";
import prefixer from "../../../helpers/prefixer";
import bem from "../../../helpers/bem";
import mergeClassNames from "../../../helpers/merge-class-names";
import type { Origin } from "../../../types/prop-types";

type Props = {
  children?: React$Element<any>;
  className?: string;
  baseClassName: string;
  open: boolean;
  origin: Origin;
};

type State = {
  open: boolean;
};

export default class PopoverAnimation extends Component {
  props: Props;
  state: State;

  static contextTypes = {
    theme: PropTypes.string.isRequired
  };

  iscroll: ?IScroll = null;
  scrollable: boolean = false;

  constructor(props: Props, context: Object) {
    super(props, context);
    this.state = { open: false };
  }

  shouldComponentUpdate(nextProps: Props, nextState: State) {
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

  componentWillReceiveProps(nextProps: Props) {
    this.setState({ open: nextProps.open });
  }

  componentWillUnmount() {
    if (this.iscroll) {
      this.iscroll.destroy();
      this.iscroll = null;
    }
  }

  updateScroll(): void {
    // FIXME: Directly specified DOM of the class name.
    const { scrollContainer } = this.refs;

    if (this.iscroll) {
      if (this.scrollable) {
        this.iscroll = new IScroll(scrollContainer, {
          bounce: false,
          mouseWheel: true,
          scrollbars: "custom",
          preventDefault: false
        });

        const selectedItem = scrollContainer.querySelector(".menu-item--selected");
        if (selectedItem && this.iscroll) {
          this.iscroll.scrollToElement(selectedItem, 0);
        }
      }

    } else if (this.iscroll) {
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
