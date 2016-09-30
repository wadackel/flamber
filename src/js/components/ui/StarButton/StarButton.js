// @flow
import React from "react";
import bem from "../../../helpers/bem";
import mergeClassNames from "../../../helpers/merge-class-names";
import { IconButton } from "../";
import { StarFillIcon, StarIcon } from "../../svg-icons/";
import type { IconButtonProps } from "../IconButton/IconButton";

const b = bem("star-button");

type Props = $All<IconButtonProps, { active: boolean }>;

export default function StarButton(props: Props) {
  const {
    className,
    active,
    ..._props
  } = props;

  return <IconButton
    {..._props}
    className={mergeClassNames(b({ active })(), className)}
    icon={active ? <StarFillIcon /> : <StarIcon />}
  />;
}

StarButton.defaultProps = {
  active: false
};
