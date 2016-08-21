import React, { PropTypes } from "react";
import bem from "../../../helpers/bem";
import mergeClassNames from "../../../helpers/merge-class-names";

const b = bem("tool-bar-item");

export default function ToolBarItem({
  className,
  children
}) {
  return (
    <div className={mergeClassNames(b(), className)}>
      {children}
    </div>
  );
}

ToolBarItem.propTypes = {
  className: PropTypes.string,
  children: PropTypes.node
};
