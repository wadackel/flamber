// @flow
import React from "react";
import bem from "../../../helpers/bem";
import mergeClassNames from "../../../helpers/merge-class-names";

import type { SizeString } from "../../../types/prop-types";

const b = bem("empty-data");

type Props = {
  className?: string;
  children?: React$Element<any>;
  size: SizeString;
  icon: React$Element<any>;
  title: React$Element<any>;
  action?: React$Element<any>;
};

export default function EmptyData(props: Props) {
  const {
    className,
    children,
    size,
    icon,
    title,
    action
  } = props;

  const modifier = { [size]: true };

  return (
    <div className={mergeClassNames(b(modifier)(), className)}>
      <h3 className={b("title", modifier)()}>{title}</h3>
      <div className={b("icon", modifier)()}>
        {icon}
      </div>
      <div className={b("body", modifier)()}>
        {children}
      </div>
      {action &&
        <div className={b("action", modifier)()}>
          {action}
        </div>
      }
    </div>
  );
}

EmptyData.defaultProps = {
  size: "md"
};
