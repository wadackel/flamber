import React, { PropTypes } from "react";
import bem from "../../../helpers/bem";
import bindHandlers from "../../../helpers/bind-handlers";
import randomId from "../../../helpers/random-id";
import shareConfig from "../../../../share-config.json";

const b = bem("raised-button");
const RIPPLE_DURATION = shareConfig["ripple-duration"];

class RippleEffect extends React.Component {
  static propTypes = {
    className: PropTypes.string,
    style: PropTypes.object,
    onRequestHide: PropTypes.func
  };

  static defaultProps = {
    onRequestHide: () => {}
  };

  constructor(props) {
    super(props);

    this.state = {
      show: true
    };

    this.timer = null;

    bindHandlers([
      "handleTimeout"
    ], this);
  }

  componentDidMount() {
    this.timer = setTimeout(this.handleTimeout, RIPPLE_DURATION);
  }

  componentWillUnmount() {
    clearTimeout(this.timer);
    this.timer = null;
    this.setState({ show: true });
  }

  handleTimeout() {
    clearTimeout(this.timer);
    this.timer = null;
    this.setState({ show: false });
    this.props.onRequestHide();
  }

  render() {
    const {
      className,
      style
    } = this.props;

    const {
      show
    } = this.state;

    if (!show) return null;

    return (
      <div className={className} style={style}></div>
    );
  }
}

export default class RaisedButton extends React.Component {
  static propTypes = {
    type: PropTypes.string.isRequired, // "default"|"primary"|"secondary"|"success"|"info"|"danger"|"warning"
    children: PropTypes.element,
    href: PropTypes.string,
    target: PropTypes.string,
    onClick: PropTypes.func
  };

  static defaultProps = {
    type: "default",
    onClick: () => {}
  };

  constructor(props) {
    super(props);

    this.state = {
      isAnimate: true,
      ripples: []
    };

    bindHandlers([
      "handleClick",
      "handleRippleHide",
      "handleMouseDown"
    ], this);
  }

  getRippleStyle(x, y, size) {
    return {
      top: y - size / 2,
      left: x - size / 2,
      width: size,
      height: size
    };
  }

  addRippleElement(x, y, size) {
    const style = this.getRippleStyle(x, y, size);

    this.setState({
      ripples: this.state.ripples.concat([
        <RippleEffect
          key={randomId()}
          className={b("ripple", { [this.props.type]: true })}
          style={style}
          onRequestHide={this.handleRippleHide}
        />
      ])
    });
  }

  handleMouseDown(e) {
    const { top, left, width, height } = this.refs.element.getBoundingClientRect();

    this.addRippleElement(
      e.pageX - (left + window.pageXOffset),
      e.pageY - (top + window.pageYOffset),
      Math.max(width, height) * 1.5
    );
  }

  handleRippleHide() {
    this.setState({ ripples: this.state.ripples.slice(1) });
  }

  handleClick(e) {
    if (this.props.onClick(e)) {
      this.props.onClick(e);
    }
  }

  render() {
    const {
      children,
      type,
      href,
      target
    } = this.props;

    const { ripples } = this.state;
    const modifier = { [type]: true };
    const label = <span className={b("label", modifier)} ref="label">{children}</span>;
    const bodyClass = b("body", modifier);
    const body = !href
      ? <button className={bodyClass} type="button" ref="body">{label}</button>
      : <a className={bodyClass} href={href} target={target} ref="body">{label}</a>;

    return (
      <div
        className={b(modifier)}
        ref="element"
        onMouseDown={this.handleMouseDown}
        onClick={this.handleClick}
      >
        <div className={b("ripple-container")}>{ripples}</div>
        {body}
      </div>
    );
  }
}
