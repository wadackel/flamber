/* eslint-disable */
import React, { PropTypes } from "react";
import ReactCSSTransitionGroup from "react-addons-css-transition-group";
import shareConfig from "../../../../share-config.json";
import * as OriginalPropTypes from "../../../constants/prop-types";
import bem from "../../../helpers/bem";
import mergeClassNames from "../../../helpers/merge-class-names";
import bindHandlers from "../../../helpers/bind-handlers";
import RenderToLayer from "../internal/RenderToLayer";

const b = bem("popover");

export default class Popover extends React.Component {
  static propTypes = {
    children: PropTypes.node,
    className: PropTypes.string,
    open: PropTypes.bool,
    origin: OriginalPropTypes.origin,
    triggerElement: PropTypes.instanceOf(HTMLElement),
    triggerOrigin: OriginalPropTypes.position,
    onRequestClose: PropTypes.func
  };

  static defaultProps = {
    open: false,
    origin: {
      vertical: "top",
      horizontal: "left"
    },
    onRequestClose: () => {}
  };

  constructor(props) {
    super(props);

    this.state = {
      open: props.open,
      closing: false
    };

    bindHandlers([
      "renderLayer",
      "handleClickAway",
      "handleClose"
    ], this);
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.open !== this.state.open) {
      if (nextProps.open) {
        this.bindCloseEvents();
        this.triggerElement = nextProps.triggerElement || this.props.triggerElement;
        this.setState({
          open: true,
          closing: false
        });

      } else {
        this.setState({ closing: true });
        this.timer = setTimeout(() => {
          this.unbindCloseEvents();
          this.setState({
            open: false,
            closing: false
          });
        }, 500);
      }
    }
  }

  componentDidUpdate() {
    this.setPositions();
  }

  componentWillUnmount() {
    clearTimeout(this.timer);
  }

  handleClickAway(e) {
    this.props.onRequestClose();
  }

  handleClose() {
    this.setPositions();
    this.props.onRequestClose();
  }

  bindCloseEvents() {
    window.addEventListener("scroll", this.handleClose, false);
    window.addEventListener("resize", this.handleClose, false);
  }

  unbindCloseEvents() {
    window.removeEventListener("scroll", this.handleClose, false);
    window.removeEventListener("resize", this.handleClose, false);
  }

  setPositions() {
    const { open, closing } = this.state;

    if (!open) return;

    const { origin } = this.props;
    const triggerElement = this.props.triggerElement || this.triggerElement;
    const layer = this.refs.layer.getLayer();

    if (!layer) return;

    const popoverElement = layer.children[0];

    if (!popoverElement) return;

    const trigger = this.getTriggerPosition(triggerElement);
    const popover = this.getPopoverPosition(popoverElement);

    popover.top = trigger[origin.vertical] - popover[origin.vertical];
    popover.left = trigger[origin.horizontal] - popover[origin.horizontal];

    popoverElement.style.top = `${Math.max(closing ? popover.top : 0, popover.top)}px`;
    popoverElement.style.left = `${Math.max(closing ? popover.left : 0, popover.left)}px`;
    popoverElement.style.maxHeight = `${window.innerHeight}px`;
  }

  getTriggerPosition(el) {
    const { top, right, bottom, left } = el.getBoundingClientRect();
    const pos = {
      width: el.offsetWidth,
      height: el.offsetHeight,
      top,
      left
    };

    pos.right = pos.right || pos.left + pos.width;
    pos.bottom = pos.bottom || pos.top + pos.height;
    pos.center = pos.left + pos.width / 2;
    pos.middle = pos.top + pos.height / 2;

    return pos;
  }

  getPopoverPosition(el) {
    const { offsetWidth, offsetHeight } = el;

    return {
      top: 0,
      middle: offsetHeight / 2,
      bottom: offsetHeight,
      left: 0,
      center: offsetWidth / 2,
      right: offsetWidth
    };
  }

  renderLayer() {
    const {
      children,
      className
    } = this.props;

    return (
      <div className={mergeClassNames(b(), className)}>
        {children}
      </div>
    );
  }

  render() {
    return (
      <RenderToLayer
        ref="layer"
        open={this.state.open}
        componentClickAway={this.handleClickAway}
        useLayerForClickAway={true}
        render={this.renderLayer}
      />
    );
  }
}
