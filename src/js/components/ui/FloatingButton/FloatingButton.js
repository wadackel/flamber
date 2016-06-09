import React, { PropTypes } from "react";
import Button from "../internal/Button";

export default class FloatingButton extends React.Component {
  static propTypes = {
    type: PropTypes.string.isRequired,
    href: PropTypes.string,
    target: PropTypes.string,
    icon: PropTypes.element,
    onClick: PropTypes.func
  };

  static defaultProps = {
    type: "default"
  };

  render() {
    return <Button
      className="floating-button"
      {...this.props}
      />;
  }
}
