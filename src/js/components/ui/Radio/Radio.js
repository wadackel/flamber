// @flow
import React from "react";
import Switch from "../internal/Switch";
import type { RadioProps } from "../internal/Switch";

export default function Radio(props: RadioProps) {
  return <Switch
    baseClassName="radio"
    type="radio"
    {...props}
  />;
}
