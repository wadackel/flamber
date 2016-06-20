/* eslint-disable */
import React, { PropTypes } from "react";
import bem from "../../../helpers/bem";
import mergeClassNames from "../../../helpers/merge-class-names";

const b = bem("card");

export default function Card({
  children,
  className,
  selected
}) {
  return <div className={mergeClassNames(b({ selected }), className)}>
    {children}
  </div>;
}

Card.propTypes = {
  children: PropTypes.node,
  className: PropTypes.string,
  selected: PropTypes.bool
};

Card.defaultProps = {
  selected: false
};
