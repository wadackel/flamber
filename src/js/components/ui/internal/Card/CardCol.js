import React, { PropTypes } from "react";
import bem from "../../../../helpers/bem";
import mergeClassNames from "../../../../helpers/merge-class-names";

export default function CardText({
  children,
  baseClassName,
  className
}) {
  const b = bem(`${baseClassName.trim()}__col`);

  return <div className={mergeClassNames(b(), className)}>
    {children}
  </div>;
}

CardText.propTypes = {
  children: PropTypes.node,
  baseClassName: PropTypes.string,
  className: PropTypes.string
};
