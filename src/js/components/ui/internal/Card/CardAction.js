// @flow
import React from "react";
import bem from "../../../../helpers/bem";

type Props = {
  children: React$Element<any>;
  baseClassName: string;
};

export default function CardAction(props: Props) {
  const {
    children,
    baseClassName
  } = props;

  const b = bem(`${baseClassName}__action`);

  return <div className={b()}>
    {children}
  </div>;
}
