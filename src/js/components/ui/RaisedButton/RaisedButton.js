import React, { PropTypes } from "react";
import Button from "../internal/Button";

export default class RaisedButton extends React.Component {
  static propTypes = {
    className: PropTypes.string,
    type: PropTypes.string.isRequired,
    children: PropTypes.node,
    href: PropTypes.string,
    target: PropTypes.string,
    icon: PropTypes.element,
    iconRight: PropTypes.element,
    onClick: PropTypes.func,
    onMouseDown: PropTypes.func,
    onMouseEnter: PropTypes.func,
    onMouseLeave: PropTypes.func,
    onKeyDown: PropTypes.func,
    onKeyUp: PropTypes.func,
    onKeyPress: PropTypes.func
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
      baseClassName="raised-button"
      label={children}
      {...props}
      />;
  }
}
