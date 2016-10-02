// @flow
import React from "react";
import bem from "../../../helpers/bem";
import mergeClassNames from "../../../helpers/merge-class-names";

const b = bem("progress-bar");

type Props = {
  className?: string;
  value: number;
  max: number;
  min: number;
};

export default function ProgressBar(props: Props) {
  const {
    className,
    value,
    max,
    min
  } = props;

  const valueStyle = {
    width: `${Math.min(Math.max(min, value), max) / (max - min) * 100}%`
  };

  return (
    <div className={mergeClassNames(b(), className)}>
      <div className={b("value")()} style={valueStyle} />
    </div>
  );
}

ProgressBar.defaultProps = {
  max: 100,
  min: 0
};
