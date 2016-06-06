import React, { Component } from "react";
import bem from "../../helpers/bem";

const b = bem("button");

export default class Button extends Component {
  render() {
    return (
      <div>
        <button className={b()}>{this.props.children}</button>
      </div>
    );
  }
}
