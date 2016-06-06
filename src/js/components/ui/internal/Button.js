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
    baseClassName: PropTypes.string.isRequired,
    type: PropTypes.string.isRequired,
    href: PropTypes.string,
    target: PropTypes.string,
    label: PropTypes.node,
    icon: PropTypes.element,
    iconRight: PropTypes.element,
    onClick: PropTypes.func,
    onMouseEnter: PropTypes.func,
    onMouseLeave: PropTypes.func
  };

  static defaultProps = {
    type: "default",
    onClick: () => {},
    onMouseEnter: () => {},
    onMouseLeave: () => {}
  };

  constructor(props) {
    super(props);

    this.state = {
      ripples: []
    };

    bindHandlers([
      "handleMouseDown",
      "handleRippleHide"
    ], this);
  }

  handleMouseDown(e) {
    e.stopPropagation();

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

  render() {
    const {
      children,
      baseClassName,
      className,
      type,
      href,
      target,
      label,
      icon,
      iconRight,
      onClick,
      onMouseEnter,
      onMouseLeave
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
        className={mergeClassNames(b(modifier), className)}
        ref="element"
        onMouseDown={this.handleMouseDown}
        onClick={onClick}
        onMouseEnter={onMouseEnter}
        onMouseLeave={onMouseLeave}
      >
        <div className={b("ripple-container")}>{ripples}</div>
        {bodyElement}
        {children}
      </div>
    );
  }
}
