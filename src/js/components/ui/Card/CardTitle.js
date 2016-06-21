import React, { PropTypes } from "react";
import bem from "../../../helpers/bem";
import mergeClassNames from "../../../helpers/merge-class-names";

const b = bem("card-title");

export default function CardTitle({
  children,
  className
}) {
  return <div className={mergeClassNames(b(), className)}>
    {children}
  </div>;
}

CardTitle.propTypes = {
  children: PropTypes.node,
  className: PropTypes.string
};
