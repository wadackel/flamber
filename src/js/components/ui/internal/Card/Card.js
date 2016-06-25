import React, { PropTypes } from "react";
import bem from "../../../../helpers/bem";

export default function Card({
  children,
  baseClassName,
  style,
  onClick,
  onMouseEnter,
  onMouseLeave
}) {
  const b = bem(baseClassName.trim());

  return <div
    className={b()}
    style={style}
    onClick={onClick}
    onMouseEnter={onMouseEnter}
    onMouseLeave={onMouseLeave}
  >
    {children}
  </div>;
}

Card.propTypes = {
  children: PropTypes.node,
  baseClassName: PropTypes.string,
  style: PropTypes.object,
  selected: PropTypes.bool,
  onClick: PropTypes.func,
  onMouseEnter: PropTypes.func,
  onMouseLeave: PropTypes.func
};

Card.defaultProps = {
  style: {},
  onClick: () => {},
  onMouseEnter: () => {},
  onMouseLeave: () => {}
};
