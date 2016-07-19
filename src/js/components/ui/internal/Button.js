import assign from "object-assign";
import React, { PropTypes } from "react";
import Ripple from "./Ripple";
import bem from "../../../helpers/bem";
import mergeClassNames from "../../../helpers/merge-class-names";
import bindHandlers from "../../../helpers/bind-handlers";
import randomId from "../../../helpers/random-id";

export default class Button extends React.Component {
  static propTypes = {
    children: PropTypes.node,
    className: PropTypes.string,
    style: PropTypes.object,
    baseClassName: PropTypes.string.isRequired,
    type: PropTypes.string.isRequired,
    disable: PropTypes.bool,
    href: PropTypes.string,
    target: PropTypes.string,
    label: PropTypes.node,
    icon: PropTypes.element,
    iconRight: PropTypes.element,
    onClick: PropTypes.func,
    onMouseDown: PropTypes.func,
    onMouseEnter: PropTypes.func,
    onMouseLeave: PropTypes.func,
    onKeyDown: PropTypes.func,
    onKeyUp: PropTypes.func,
    onKeyPress: PropTypes.func
  };

  static defaultProps = {
    type: "default",
    disable: false,
    style: {},
    onClick: () => {},
    onMouseDown: () => {},
    onMouseEnter: () => {},
    onMouseLeave: () => {},
    onKeyDown: () => {},
    onKeyUp: () => {},
    onKeyPress: () => {}
  };

  constructor(props, context) {
    super(props, context);

    this.state = {
      ripples: []
    };

    bindHandlers([
      "handleMouseDown",
      "handleRippleHide"
    ], this);
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
    const b = bem(baseClassName.trim());
    const style = this.getRippleStyle(top, left, size);

    this.setState({
      ripples: ripples.concat([
        <Ripple
          key={randomId()}
          className={b("ripple", { [type]: true })}
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
      onClick,
      onMouseEnter,
      onMouseLeave,
      onKeyDown,
      onKeyUp,
      onKeyPress
    } = this.props;

    const { ripples } = this.state;
    const b = bem(baseClassName.trim());
    const modifier = { [type]: true, disable };
    const labelElement = label ? <span className={b("label", modifier)}>{label}</span> : null;
    const iconElement = this.createIcon(icon, b("icon", modifier));
    const iconRightElement = this.createIcon(iconRight, b("icon", assign(modifier, { right: true })));
    const bodyClass = b("body", modifier);
    const bodyElement = !href
      ? <button className={bodyClass}>{iconElement}{labelElement}{iconRightElement}</button>
      : <a className={bodyClass} href={href} target={target}>{iconElement}{labelElement}{iconRightElement}</a>;

    const events = disable ? {} : {
      onMouseDown: this.handleMouseDown,
      onClick,
      onMouseEnter,
      onMouseLeave,
      onKeyDown,
      onKeyUp,
      onKeyPress
    };

    return (
      <div
        ref="element"
        className={mergeClassNames(b(modifier), className)}
        style={style}
        {...events}
      >
        <div className={b("ripple-container")}>{ripples}</div>
        {bodyElement}
        {children}
      </div>
    );
  }
}
