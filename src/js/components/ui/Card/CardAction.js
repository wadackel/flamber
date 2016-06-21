import React, { PropTypes } from "react";
import bem from "../../../helpers/bem";
import mergeClassNames from "../../../helpers/merge-class-names";

const b = bem("card-action");

export default function CardAction({
  children,
  className
}) {
  return <div className={mergeClassNames(b(), className)}>
    {children}
  </div>;
}

CardAction.propTypes = {
  children: PropTypes.node,
  className: PropTypes.string
};
