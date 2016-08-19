import React, { PropTypes } from "react";
import bem from "../../../helpers/bem";
import mergeClassNames from "../../../helpers/merge-class-names";

const b = bem("empty-data");

export default function EmptyData({
  className,
  children,
  size,
  icon,
  title,
  action
}) {
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

EmptyData.propTypes = {
  className: PropTypes.string,
  children: PropTypes.node.isRequired,
  size: PropTypes.oneOf(["xs", "sm", "md", "lg", "xl"]),
  icon: PropTypes.node.isRequired,
  title: PropTypes.node.isRequired,
  action: PropTypes.node
};

EmptyData.defaultProps = {
  size: "md"
};
