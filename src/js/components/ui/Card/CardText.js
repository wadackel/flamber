/* eslint-disable */
import React, { PropTypes } from "react";
import bem from "../../../helpers/bem";
import mergeClassNames from "../../../helpers/merge-class-names";

const b = bem("card-text");

export default function CardText({
  children,
  className
}) {
  return <div className={mergeClassNames(b(), className)}>
    {children}
  </div>;
}

CardText.propTypes = {
  children: PropTypes.node,
  className: PropTypes.string
};
