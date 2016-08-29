import React, { PropTypes } from "react";
import * as OriginalPropTypes from "../../../constants/prop-types";
import bem from "../../../helpers/bem";
import mergeClassNames from "../../../helpers/merge-class-names";
import { IconButton } from "../";
import { StarFillIcon, StarIcon } from "../../svg-icons/";

const b = bem("star-button");

export default class StarButton extends React.Component {
  static propTypes = {
    className: PropTypes.string,
    size: PropTypes.string,
    active: PropTypes.bool,
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
    active: false
  };

  render() {
    const {
      className,
      active,
      ...props
    } = this.props;

    return <IconButton
      className={mergeClassNames(b({ active })(), className)}
      icon={active ? <StarFillIcon /> : <StarIcon />}
      {...props}
    />;
  }
}
