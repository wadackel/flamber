// @flow
import React from "react";
import bem from "../../../helpers/bem";
import mergeClassNames from "../../../helpers/merge-class-names";

const b = bem("nav");

type Props = {
  children?: React$Element<any>;
  className?: string;
}

export default function Nav(props: Props) {
  const {
    children,
    className
  } = props;

  const cloneChildren = React.Children.map(children, (item, index) =>
    React.cloneElement(item, { key: index })
  );

  return (
    <nav className={mergeClassNames(b(), className)}>
      <ul className={b("list")()}>
        {cloneChildren}
      </ul>
    </nav>
  );
}
