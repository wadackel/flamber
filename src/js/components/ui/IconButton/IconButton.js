import React, { PropTypes } from "react";
import * as OriginalPropTypes from "../../../constants/prop-types";
import bem from "../../../helpers/bem";
import mergeClassNames from "../../../helpers/merge-class-names";
import Button from "../internal/Button";

const b = bem("icon-button");

export default class IconButton extends React.Component {
  static propTypes = {
    className: PropTypes.string,
    style: PropTypes.object,
    type: PropTypes.string.isRequired,
    size: PropTypes.string,
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
    const {
      size,
      className,
      ...props
    } = this.props;

    const modifier = size ? { [size]: true } : null;
    const btnClassName = mergeClassNames(modifier ? b(modifier)() : null, className);

    return <Button
      baseClassName={b()}
      className={btnClassName}
      {...props}
    />;
  }
}
