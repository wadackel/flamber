import React, { PropTypes } from "react";
import bem from "../../../helpers/bem";
import mergeClassNames from "../../../helpers/merge-class-names";

const b = bem("avatar");

export default function Avatar({
  className,
  primary,
  secondary,
  icon,
  onClick,
  onIconClick
}) {
  const iconStyle = {
    backgroundImage: `url("${icon}")`
  };

  return (
    <div
      className={mergeClassNames(b(), className)}
      onClick={onClick}
    >
      <div className={b("body")()}>
        <div className={b("primary")()}>{primary}</div>
        <div className={b("secondary")()}>{secondary}</div>
      </div>
      <div
        className={b("icon")()}
        style={iconStyle}
        onClick={onIconClick}
      />
    </div>
  );
}

Avatar.propTypes = {
  className: PropTypes.string,
  primary: PropTypes.string,
  secondary: PropTypes.string,
  icon: PropTypes.string,
  onClick: PropTypes.func,
  onIconClick: PropTypes.func
};
