// @flow
import React from "react";
import bem from "../../../helpers/bem";
import mergeClassNames from "../../../helpers/merge-class-names";

const b = bem("avatar");

type Props = {
  className: string;
  primary: string;
  secondary: string;
  icon: string;
  onClick: Function;
  onIconClick: Function;
};

export default function Avatar(props: Props) {
  const {
    className,
    primary,
    secondary,
    icon,
    onClick,
    onIconClick
  } = props;

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
