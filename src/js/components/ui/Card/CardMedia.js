/* eslint-disable */
import React, { PropTypes } from "react";
import bem from "../../../helpers/bem";
import mergeClassNames from "../../../helpers/merge-class-names";

const b = bem("card-media");

export default function CardMedia({
  children,
  className,
  overlay
}) {
  return <div className={mergeClassNames(b(), className)}>
    {children}
  </div>;
}

CardMedia.propTypes = {
  children: PropTypes.node,
  className: PropTypes.string,
  overlay: PropTypes.element
};
