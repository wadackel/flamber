import React, { PropTypes } from "react";
import Button from "../internal/Button";

export default class FlatButton extends React.Component {
  static propTypes = {
    type: PropTypes.string.isRequired,
    children: PropTypes.node,
    href: PropTypes.string,
    target: PropTypes.string,
    icon: PropTypes.element,
    iconRight: PropTypes.element,
    onClick: PropTypes.func
  };

  static defaultProps = {
    type: "default"
  };

  render() {
    const {
      children,
      ...props
    } = this.props;

    return <Button
      className="flat-button"
      label={children}
      {...props}
      />;
  }
}
