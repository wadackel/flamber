import _ from "lodash";
import autoBind from "auto-bind";
import keycode from "keycode";
import React, { PropTypes } from "react";
import * as OriginalPropTypes from "../../../constants/prop-types";
import Ripple from "./Ripple";
import bem from "../../../helpers/bem";
import mergeClassNames from "../../../helpers/merge-class-names";
import randomId from "../../../helpers/random-id";
import Tooltip, { TooltipPositions } from "./Tooltip";

export default class Button extends React.Component {
  static propTypes = {
    children: PropTypes.node,
    className: PropTypes.string,
    style: PropTypes.object,
    baseClassName: PropTypes.string.isRequired,
    type: PropTypes.string.isRequired,
    disable: PropTypes.bool,
    enableKeyClick: PropTypes.bool,
    href: PropTypes.string,
    target: PropTypes.string,
    label: PropTypes.node,
    icon: PropTypes.element,
    iconRight: PropTypes.element,
    tooltip: PropTypes.string,
    tooltipOrigin: OriginalPropTypes.origin,
    tooltipPositions: TooltipPositions,
    onClick: PropTypes.func,
    onMouseDown: PropTypes.func,
    onMouseEnter: PropTypes.func,
    onMouseLeave: PropTypes.func,
    onKeyDown: PropTypes.func,
    onKeyUp: PropTypes.func,
    onKeyPress: PropTypes.func,
    onFocus: PropTypes.func,
    onBlur: PropTypes.func
  };

  static defaultProps = {
    type: "default",
    disable: false,
    enableKeyClick: true,
    style: {},
    tooltipOrigin: {
      vertical: "top",
      horizontal: "center"
    },
    tooltipPositions: {
      top: "90%",
      right: "10%",
      bottom: "90%",
      left: "10%"
    },
    onClick: () => {},
    onMouseDown: () => {},
    onMouseEnter: () => {},
    onMouseLeave: () => {},
    onKeyDown: () => {},
    onKeyUp: () => {},
    onKeyPress: () => {},
    onFocus: () => {},
    onBlur: () => {}
  };

  constructor(props, context) {
    super(props, context);

    this.state = {
      ripples: [],
      showTooltip: false
    };

    autoBind(this);
  }

  shouldComponentUpdate(nextProps, nextState) {
    return !_.isEqual(this.props, nextProps) || !_.isEqual(this.state, nextState);
  }

  handleMouseDown(e) {
    const { top, left, width, height } = this.refs.element.getBoundingClientRect();
    const mouseX = e.pageX - (left + window.pageXOffset);
    const mouseY = e.pageY - (top + window.pageYOffset);
    const center = Math.sqrt(Math.pow(width / 2, 2) + Math.pow(height / 2, 2));
    const touch = Math.sqrt(Math.pow(width / 2 - mouseX, 2) + Math.pow(height / 2 - mouseY, 2));

    this.addRippleElement(
      e.pageY - (top + window.pageYOffset),
      e.pageX - (left + window.pageXOffset),
      (center + (center * (touch / center))) * 2
    );

    this.props.onMouseDown(e);
  }

  handleMouseEnter(e) {
    if (this.props.tooltip) {
      this.setState({ showTooltip: true });
    }

    this.props.onMouseEnter(e);
  }

  handleMouseLeave(e) {
    if (this.props.tooltip) {
      this.setState({ showTooltip: false });
    }

    this.props.onMouseLeave(e);
  }

  handleKeyDown(e) {
    const key = keycode(e);

    this.props.onKeyDown(e);

    if (this.props.enableKeyClick && (key === "enter" || key === "space")) {
      this.props.onClick(e);
    }
  }

  handleRippleHide() {
    const ripples = this.state.ripples.slice(1);
    this.setState({ ripples });
  }

  getRippleStyle(top, left, size) {
    return {
      width: size,
      height: size,
      top,
      left
    };
  }

  addRippleElement(top, left, size) {
    const { baseClassName, type } = this.props;
    const { ripples } = this.state;
    const b = bem(baseClassName);
    const style = this.getRippleStyle(top, left, size);

    this.setState({
      ripples: ripples.concat([
        <Ripple
          key={randomId()}
          className={b("ripple", { [type]: true })()}
          style={style}
          onRequestHide={this.handleRippleHide}
        />
      ])
    });
  }

  createIcon(icon, className) {
    return icon ? <span className={className}>{icon}</span> : null;
  }

  focus() {
    this.refs.element.focus();
  }

  blur() {
    this.refs.element.blur();
  }

  render() {
    const {
      children,
      baseClassName,
      className,
      style,
      type,
      disable,
      href,
      target,
      label,
      icon,
      iconRight,
      tooltip,
      tooltipOrigin,
      tooltipPositions,
      onClick,
      onMouseEnter, // eslint-disable-line no-unused-vars
      onMouseLeave, // eslint-disable-line no-unused-vars
      onKeyDown, // eslint-disable-line no-unused-vars
      onKeyUp,
      onKeyPress,
      onFocus,
      onBlur
    } = this.props;

    const {
      ripples,
      showTooltip
    } = this.state;

    const b = bem(baseClassName);
    const modifier = { [type]: true, disable };
    const labelElement = label ? <span className={b("label", modifier)()}>{label}</span> : null;
    const iconElement = this.createIcon(icon, b("icon", modifier)());
    const iconRightElement = this.createIcon(iconRight, b("icon", _.assign(modifier, { right: true }))());
    const bodyClass = b("body", modifier)();
    const bodyElement = !href
      ? <button className={bodyClass} tabIndex="-1">
          {iconElement}{labelElement}{iconRightElement}
        </button>
      : <a className={bodyClass} href={href} target={target} tabIndex="-1">
          {iconElement}{labelElement}{iconRightElement}
        </a>;

    const events = disable ? {} : {
      onMouseDown: this.handleMouseDown,
      onMouseEnter: this.handleMouseEnter,
      onMouseLeave: this.handleMouseLeave,
      onKeyDown: this.handleKeyDown,
      onClick,
      onKeyUp,
      onKeyPress,
      onFocus,
      onBlur
    };

    return (
      <div
        ref="element"
        className={mergeClassNames(b(modifier)(), className)}
        style={style}
        tabIndex={disable ? null : 0}
        {...events}
      >
        <div className={b("ripple-container")()}>{ripples}</div>
        {bodyElement}
        {children}
        {tooltip &&
          <Tooltip
            baseClassName={b("tooltip")()}
            show={showTooltip}
            label={tooltip}
            origin={tooltipOrigin}
            positions={tooltipPositions}
          />
        }
      </div>
    );
  }
}
