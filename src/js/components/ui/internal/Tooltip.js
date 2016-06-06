/* eslint-disable */
import React, { PropTypes } from "react";
import * as OriginalPropTypes from "../../../constants/prop-types";
import bem from "../../../helpers/bem";
import mergeClassNames from "../../../helpers/merge-class-names";

export default class Tooltip extends React.Component {
  static propTypes = {
    baseClassName: PropTypes.string.isRequired,
    className: PropTypes.string,
    show: PropTypes.bool,
    label: PropTypes.string.isRequired,
    origin: OriginalPropTypes.origin
  };

  static defaultPropTypes = {
    show: false,
    origin: {
      vertical: "top",
      horizontal: "center"
    }
  };

  render() {
    const {
      baseClassName,
      className,
      show,
      label,
      origin
    } = this.props;

    const b = bem(baseClassName);
    const modifier = {
      show,
      [`${origin.vertical}-${origin.horizontal}`]: true
    };

    return (
      <div className={mergeClassNames(b(modifier), className)}>
        <div className={b("ripple", modifier)}>
          <span className={b("label")}>{label}</span>
        </div>
      </div>
    );
  }
}
