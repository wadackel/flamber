import React, { PropTypes } from "react";
import bem from "../../../helpers/bem";
import mergeClassNames from "../../../helpers/merge-class-names";

const b = bem("tool-bar");

function renderNodeAddKeyIfNeeded(node) {
  if (Array.isArray(node)) {
    return node.map((o, i) => React.cloneElement(o, { key: i }));
  }

  return node;
}

export default function ToolBar({
  className,
  left,
  title,
  right
}) {
  return (
    <div className={mergeClassNames(b(), className)}>
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

ToolBar.propTypes = {
  className: PropTypes.string,
  left: PropTypes.node,
  title: PropTypes.node,
  right: PropTypes.node
};
