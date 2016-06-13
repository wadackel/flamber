import assign from "object-assign";
import React, { PropTypes } from "react";
import Ripple from "./Ripple";
import bem from "../../../helpers/bem";
import bindHandlers from "../../../helpers/bind-handlers";
import randomId from "../../../helpers/random-id";

export default class Button extends React.Component {
  static propTypes = {
    className: PropTypes.string,
    baseClassName: PropTypes.string.isRequired,
    type: PropTypes.string.isRequired,
    href: PropTypes.string,
    target: PropTypes.string,
    label: PropTypes.node,
    icon: PropTypes.element,
    iconRight: PropTypes.element,
    onClick: PropTypes.func
  };

  static defaultProps = {
    type: "default",
    onClick: () => {}
  };

  constructor(props) {
    super(props);

    this.state = {
      ripples: []
    };

    bindHandlers([
      "handleClick",
      "handleMouseDown",
      "handleRippleHide"
    ], this);
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

  handleClick(e) {
    this.props.onClick(e);
  }

  handleMouseDown(e) {
    e.stopPropagation();

    const { top, left, width, height } = this.refs.element.getBoundingClientRect();

    this.addRippleElement(
      e.pageY - (top + window.pageYOffset),
      e.pageX - (left + window.pageXOffset),
      Math.sqrt(width * width + height * height) * 1.8
    );
  }

  handleRippleHide() {
    const ripples = this.state.ripples.slice(1);
    this.setState({ ripples });
  }

  render() {
    const {
      baseClassName,
      className,
      type,
      href,
      target,
      label,
      icon,
      iconRight
    } = this.props;

    const { ripples } = this.state;
    const b = bem(baseClassName);
    const modifier = { [type]: true };
    const labelElement = label ? <span className={b("label", modifier)}>{label}</span> : null;
    const iconElement = this.createIcon(icon, b("icon", modifier));
    const iconRightElement = this.createIcon(iconRight, b("icon", assign(modifier, { right: true })));
    const bodyClass = b("body", modifier);
    const bodyElement = !href
      ? <button className={bodyClass}>{iconElement}{labelElement}{iconRightElement}</button>
      : <a className={bodyClass} href={href} target={target}>{iconElement}{labelElement}{iconRightElement}</a>;

    return (
      <div
        className={b(modifier) + (className ? className : "")}
        ref="element"
        onMouseDown={this.handleMouseDown}
        onClick={this.handleClick}
      >
        <div className={b("ripple-container")}>{ripples}</div>
        {bodyElement}
      </div>
    );
  }
}
