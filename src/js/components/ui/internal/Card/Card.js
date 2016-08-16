import React, { PropTypes } from "react";
import bem from "../../../../helpers/bem";
import mergeClassNames from "../../../../helpers/merge-class-names";
import { ProcessingOverlay } from "../../";

export default function Card({
  children,
  baseClassName,
  className,
  style,
  processing,
  onClick,
  onMouseEnter,
  onMouseLeave
}) {
  const b = bem(baseClassName);

  return <div
    className={mergeClassNames(b(), className)}
    style={style}
    onClick={onClick}
    onMouseEnter={onMouseEnter}
    onMouseLeave={onMouseLeave}
  >
    <ProcessingOverlay
      className={b("processing-overlay", { processing })()}
      show={processing}
      spinnerSize={26}
    />
    <div className={b("inner")()}>
      {children}
    </div>
  </div>;
}

Card.propTypes = {
  children: PropTypes.node,
  baseClassName: PropTypes.string,
  className: PropTypes.string,
  style: PropTypes.object,
  processing: PropTypes.bool,
  selected: PropTypes.bool,
  onClick: PropTypes.func,
  onMouseEnter: PropTypes.func,
  onMouseLeave: PropTypes.func
};

Card.defaultProps = {
  style: {},
  onClick: () => {},
  onMouseEnter: () => {},
  onMouseLeave: () => {}
};
