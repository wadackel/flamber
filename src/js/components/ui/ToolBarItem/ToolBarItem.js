// @flow
import React from "react";
import bem from "../../../helpers/bem";
import mergeClassNames from "../../../helpers/merge-class-names";

const b = bem("tool-bar-item");

type Props = {
  children: React$Element<any>;
  className: string;
};

export default function ToolBarItem(props: Props) {
  const {
    className,
    children
  } = props;

  return (
    <div className={mergeClassNames(b(), className)}>
      {children}
    </div>
  );
}
