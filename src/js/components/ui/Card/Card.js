import React, { PropTypes } from "react";
import bem from "../../../helpers/bem";
import mergeClassNames from "../../../helpers/merge-class-names";

const b = bem("card");

export default function Card({
  children,
  className,
  style
}) {
  return <div
    className={mergeClassNames(b(), className)}
    style={style}
  >
    {children}
  </div>;
}

Card.propTypes = {
  children: PropTypes.node,
  className: PropTypes.string,
  style: PropTypes.object,
  selected: PropTypes.bool
};

Card.defaultProps = {
  style: {}
};
