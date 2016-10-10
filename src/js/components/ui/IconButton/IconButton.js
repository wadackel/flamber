// @flow
import React, { Component } from "react";
import bem from "../../../helpers/bem";
import mergeClassNames from "../../../helpers/merge-class-names";
import Button from "../internal/Button";
import type { SizeString } from "../../../types/prop-types";
import type { ButtonProps } from "../internal/Button";

const b = bem("icon-button");

export type IconButtonProps = $All<ButtonProps, { size: ?SizeString }>;

export default class IconButton extends Component {
  props: IconButtonProps;

  static defaultProps = {
    type: "default"
  };

  render() {
    const {
      size,
      className,
      ..._props
    } = this.props;

    const modifier = size ? { [size]: true } : null;
    const btnClassName = mergeClassNames(modifier ? b(modifier)() : null, className);

    return <Button
      baseClassName={b()}
      className={btnClassName}
      {..._props}
    />;
  }
}
