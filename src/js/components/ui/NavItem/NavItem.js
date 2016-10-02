// @flow
import React from "react";
import bem from "../../../helpers/bem";
import mergeClassNames from "../../../helpers/merge-class-names";
import Button from "../internal/Button";

const b = bem("nav-item");

type Props = {
  children?: React$Element<any>;
  className?: string;
  active: boolean;
  onClick?: Function;
};

export default function NavItem(props: Props) {
  const {
    children,
    className,
    active,
    ..._props
  } = props;

  return (
    <li className={mergeClassNames(b({ active })(), className)}>
      <Button
        baseClassName={b("button")()}
        className={active ? b("button--active")() : ""}
        label={children}
        {..._props}
      />
    </li>
  );
}

NavItem.defaultProps = {
  active: false
};
