import React, { PropTypes } from "react";
import bem from "../../../../helpers/bem";

export default function CardAction({
  children,
  baseClassName
}) {
  const b = bem(`${baseClassName}__action`);

  return <div className={b()}>
    {children}
  </div>;
}

CardAction.propTypes = {
  children: PropTypes.node,
  baseClassName: PropTypes.string
};
