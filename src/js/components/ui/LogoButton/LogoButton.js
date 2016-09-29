// @flow
import React from "react";
import Button from "../internal/Button";
import { LogoIcon } from "../../svg-icons/";
import type { ButtonProps } from "../internal/Button";

export default function LogoButton(props: ButtonProps) {
  return <Button
    {...props}
    baseClassName="logo-button"
    icon={<LogoIcon />}
  />;
}
