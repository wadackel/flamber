// @flow
import React from "react";
import bem from "../../../../helpers/bem";
import mergeClassNames from "../../../../helpers/merge-class-names";
import { ProcessingOverlay } from "../../";

type Props = {
  children: React$Element<any>;
  className?: string;
  baseClassName: string;
  style?: Object;
  processing: boolean;
  selected: boolean;
  onClick?: Function;
  onMouseEnter?: Function;
  onMouseLeave?: Function;
};

export default function Card(props: Props) {
  const {
    children,
    baseClassName,
    className,
    style,
    processing,
    onClick,
    onMouseEnter,
    onMouseLeave
  } = props;

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

Card.defaultProps = {
  style: {},
  onClick: () => {},
  onMouseEnter: () => {},
  onMouseLeave: () => {}
};
