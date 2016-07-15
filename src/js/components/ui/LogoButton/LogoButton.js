import React, { Component } from "react";
import Button from "../internal/Button";
import { LogoIcon } from "../../svg-icons/";

export default class LogoButton extends Component {
  render() {
    const {
      icon, // eslint-disable-line no-unused-vars, react/prop-types
      ...props
    } = this.props;

    return <Button
      baseClassName="logo-button"
      icon={<LogoIcon />}
      {...props}
    />;
  }
}
