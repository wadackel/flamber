// @flow
import React from "react";
import bem from "../../../helpers/bem";
import mergeClassNames from "../../../helpers/merge-class-names";
import { Spinner } from "../";

const b = bem("processing-overlay");

type Props = {
  children: ?React$Element<any>;
  className?: string;
  style?: Object;
  show: boolean;
  spinnerSize: number;
};

export default function ProcessingOverlay(props: Props) {
  const {
    children,
    className,
    style,
    show,
    spinnerSize
  } = props;

  const modifier = { show };

  return (
    <div className={mergeClassNames(b(modifier)(), className)} style={style}>
      {show &&
        <div>
          <Spinner
            className={b("spinner", modifier)()}
            size={spinnerSize}
          />
          <div className={b("text", modifier)()}>{children}</div>
        </div>
      }
    </div>
  );
}

ProcessingOverlay.defaultProps = {
  show: false,
  spinnerSize: 28
};
