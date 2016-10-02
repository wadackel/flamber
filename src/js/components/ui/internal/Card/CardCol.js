// @flow
import React from "react";
import bem from "../../../../helpers/bem";
import mergeClassNames from "../../../../helpers/merge-class-names";

type Props = {
  children: React$Element<any>;
  baseClassName: string;
  className?: string;
};

export default function CardText(props: Props) {
  const {
    children,
    baseClassName,
    className
  } = props;

  const b = bem(`${baseClassName}__col`);

  return <div className={mergeClassNames(b(), className)}>
    {children}
  </div>;
}
