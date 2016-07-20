import React, { PropTypes } from "react";
import * as OriginalPropTypes from "../../../constants/prop-types";
import Button from "../internal/Button";

export default class FloatingButton extends React.Component {
  static propTypes = {
    className: PropTypes.string,
    style: PropTypes.object,
    type: PropTypes.string.isRequired,
    href: PropTypes.string,
    target: PropTypes.string,
    icon: PropTypes.element,
    tooltip: PropTypes.string,
    tooltipOrigin: OriginalPropTypes.origin,
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
    return <Button
      baseClassName="floating-button"
      tooltipPositions={{
        top: "110%",
        right: "110%",
        bottom: "110%",
        left: "110%"
      }}
      {...this.props}
    />;
  }
}
