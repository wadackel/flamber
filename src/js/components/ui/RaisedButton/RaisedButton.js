import React, { PropTypes } from "react";
import bem from "../../../helpers/bem";
import bindHandlers from "../../../helpers/bind-handlers";
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
      "handleRippleHide"
    ], this);
  }

  getRippleStyle(x, y, w, h) {
    const size = Math.max(w, h);

    return {
      top: y - size / 2,
      left: x - size / 2,
      width: size,
      height: size
    };
  }

  handleClick(e) {
    const { element } = this.refs;
    const { top, left, width, height } = element.getBoundingClientRect();
    const style = this.getRippleStyle(
      e.pageX - (left + window.pageXOffset),
      e.pageY - (top + window.pageYOffset),
      width,
      height
    );

    this.setState({
      ripples: this.state.ripples.concat([
        <RippleEffect
          key={Math.random()}
          className={b("ripple")}
          style={style}
          onRequestHide={this.handleRippleHide}
        />
      ])
    });
  }

  handleRippleHide() {
    this.setState({ ripples: this.state.ripples.slice(1) });
  }

  render() {
    const {
      children,
      type,
      href,
      target
    } = this.props;

    const {
      ripples
    } = this.state;

    const modifier = { [type]: true };
    const isAnchor = !!href;
    const bodyProps = isAnchor
      ? {
        href,
        target
      }
      : {
        type: "button"
      };

    bodyProps.ref = "body";
    bodyProps.className = b("body", modifier);

    const label = <span className={b("label", modifier)} ref="label">{children}</span>;

    const body = React.createElement(isAnchor ? "a" : "button", bodyProps, [ripples, label]);

    return (
      <div className={b(modifier)} onClick={this.handleClick} ref="element">
        {body}
      </div>
    );
  }
}
