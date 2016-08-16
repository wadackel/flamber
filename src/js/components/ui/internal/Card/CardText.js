import React, { PropTypes } from "react";
import bem from "../../../../helpers/bem";

export default function CardText({
  children,
  baseClassName
}) {
  const b = bem(`${baseClassName}__text`);

  return <div className={b()}>
    {children}
  </div>;
}

CardText.propTypes = {
  children: PropTypes.node,
  baseClassName: PropTypes.string
};
