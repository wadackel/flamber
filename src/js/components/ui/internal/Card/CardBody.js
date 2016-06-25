import React, { PropTypes } from "react";
import bem from "../../../../helpers/bem";

export default function CardBody({
  children,
  baseClassName
}) {
  const b = bem(baseClassName.trim());

  return <div className={b()}>
    {children}
  </div>;
}

CardBody.propTypes = {
  children: PropTypes.node,
  baseClassName: PropTypes.string
};
