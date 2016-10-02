// @flow
import React from "react";
import bem from "../../../helpers/bem";
import mergeClassNames from "../../../helpers/merge-class-names";
import { Spinner } from "../";

const b = bem("processing-overlay");

type Props = {
  className?: string;
  style?: Object;
  show: boolean;
  spinnerSize: number;
};

export default function ProcessingOverlay(props: Props) {
  const {
    className,
    style,
    show,
    spinnerSize
  } = props;

  const modifier = { show };

  return (
    <div className={mergeClassNames(b(modifier)(), className)} style={style}>
      {show &&
        <Spinner
          className={b("spinner", modifier)()}
          size={spinnerSize}
          style={{ position: "absolute" }}
        />
      }
    </div>
  );
}

ProcessingOverlay.defaultProps = {
  style: {},
  show: false,
  spinnerSize: 28
};
