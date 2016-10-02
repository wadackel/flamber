// @flow
import React from "react";
import Switch from "../internal/Switch";
import type { CheckboxProps } from "../internal/Switch";

export default function Checkbox(props: CheckboxProps) {
  return <Switch
    baseClassName="checkbox"
    type="checkbox"
    {...props}
  />;
}
