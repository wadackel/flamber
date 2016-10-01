// @flow
import React from "react";
import bem from "../../../helpers/bem";
import mergeClassNames from "../../../helpers/merge-class-names";

const b = bem("label");

type Props = {
  children: React$Element<any>;
  className?: string;
  icon?: React$Element<any>;
};

export default function Label(props: Props) {
  const {
    children,
    className,
    icon
  } = props;

  return (
    <div className={mergeClassNames(b(), className)}>
      {icon && <span className={b("icon")()}>{icon}</span>}
      {children}
    </div>
  );
}
