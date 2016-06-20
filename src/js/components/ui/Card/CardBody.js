/* eslint-disable */
import React, { PropTypes } from "react";
import bem from "../../../helpers/bem";
import mergeClassNames from "../../../helpers/merge-class-names";

const b = bem("card-body");

export default function CardBody({
  children,
  className
}) {
  return <div className={mergeClassNames(b(), className)}>
    {children}
  </div>;
}

CardBody.propTypes = {
  children: PropTypes.node,
  className: PropTypes.string
};
