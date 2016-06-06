import React, { PropTypes } from "react";
import bem from "../../../helpers/bem";

const b = bem("raised-button");

export default class RaisedButton extends React.Component {
  static propTypes = {
    children: PropTypes.element,
    href: PropTypes.string,
    onClick: PropTypes.func,
    type: PropTypes.string.isRequired
  };

  static defaultProps = {
    type: "default"
  };

  render() {
    return (
      <div className={b()}>
        <button className={b("body")}>{this.props.children}</button>
      </div>
    );
  }
}
