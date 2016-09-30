// @flow
import React from "react";
import Button from "../internal/Button";
import type { ButtonProps } from "../internal/Button";

export default function RaisedButton(props: ButtonProps) {
  const { children, ..._props } = props;

  return <Button
    {..._props}
    baseClassName="raised-button"
    label={children}
  />;
}
