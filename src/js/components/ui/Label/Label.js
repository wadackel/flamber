import React, { PropTypes } from "react";
import bem from "../../../helpers/bem";
import mergeClassNames from "../../../helpers/merge-class-names";

const b = bem("label");

export default function Label({
  children,
  className,
  icon
}) {
  return (
    <div className={mergeClassNames(b(), className)}>
      {icon && <span className={b("icon")}>{icon}</span>}
      {children}
    </div>
  );
}

Label.propTypes = {
  children: PropTypes.node,
  className: PropTypes.string,
  icon: PropTypes.element
};
