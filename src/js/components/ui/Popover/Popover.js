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
        this.unbindCloseEvents();
        this.setState({ closing: true });
        this.timer = setTimeout(() => {
          this.setState({
            open: false
          });
        }, 500);
      }
    }
  }

  componentWillUnmount() {
    clearTimeout(this.timer);
  }

  handleClickAway(e) {
    this.props.onRequestClose();
  }

  handleClose() {
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
    console.log("POSITIONS");
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
