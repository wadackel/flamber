import React, { PropTypes } from "react";
import bem from "../../../helpers/bem";
import bindHandlers from "../../../helpers/bind-handlers";

const b = bem("raised-button");

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

    this.state = {};

    bindHandlers([
      "handleClick"
    ], this);
  }

  handleClick(e) {
    console.log(e.pageX, e.pageY, e.clientX, e.clientY);
    // TODO: Ripple effect
  }

  render() {
    const body = this.props.href
      ? <a className={b("body")} href={this.props.href} target={this.props.target}>{this.props.children}</a>
      : <button className={b("body")}>{this.props.children}</button>;

    return (
      <div className={b({ [this.props.type]: true })} onClick={this.handleClick}>
        {body}
      </div>
    );
  }
}
