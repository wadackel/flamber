// @flow
import React from "react";
import bem from "../../../helpers/bem";
import mergeClassNames from "../../../helpers/merge-class-names";

const b = bem("tool-bar");

function renderNodeAddKeyIfNeeded(node: ?React$Element<any>): ?React$Element<any> {
  if (Array.isArray(node)) {
    return node.map((o, i) => React.cloneElement(o, { key: i }));
  }

  return node;
}


type Props = {
  className?: string;
  style?: Object;
  left?: React$Element<any>;
  title?: React$Element<any>;
  right?: React$Element<any>;
};

export default function ToolBar(props: Props) {
  const {
    className,
    style,
    left,
    title,
    right
  } = props;

  return (
    <div className={mergeClassNames(b(), className)} style={style}>
      <div className={b("col", { left: true })()}>
        {renderNodeAddKeyIfNeeded(left)}
      </div>
      <div className={b("col", { center: true })()}>
        {renderNodeAddKeyIfNeeded(title)}
      </div>
      <div className={b("col", { right: true })()}>
        {renderNodeAddKeyIfNeeded(right)}
      </div>
    </div>
  );
}

ToolBar.defaultProps = {
  style: {}
};
