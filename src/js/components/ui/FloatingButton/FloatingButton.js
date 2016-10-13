// @flow
import React from "react";
import Button from "../internal/Button";

import type { ButtonProps } from "../internal/Button";

export default function FloatingButton(props: ButtonProps) {
  return <Button
    {...props}
    baseClassName="floating-button"
    tooltipPositions={{
      top: "110%",
      right: "110%",
      bottom: "110%",
      left: "110%"
    }}
  />;
}
