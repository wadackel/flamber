// @flow
import React from "react";
import bem from "../../../helpers/bem";
import mergeClassNames from "../../../helpers/merge-class-names";
import { SortSwitcher, SelectColorMenu } from "../";
import type { OrderBy, Order, Origin } from "../../../types/prop-types";
import type { SelectableColorValue } from "../SelectColorPopover/SelectColorPopover";


const b = bem("card-group-control");

type Props = {
  className?: string;
  sortOrderBy?: OrderBy;
  sortOrder?: Order;
  sortTypes?: Array<{ name: string; value: string; }>;
  onSortOrderByChange?: Function;
  onSortOrderChange?: Function;
  colorOrigin: Origin;
  colorTriggerOrigin: Origin;
  selectColors: Array<string>;
  colors?: Array<SelectableColorValue>;
  onColorComplete: Function;
};

export default function CardGroupControl(props: Props) {
  const {
    className,
    sortOrderBy,
    sortOrder,
    sortTypes,
    onSortOrderByChange,
    onSortOrderChange,
    colorOrigin,
    colorTriggerOrigin,
    selectColors,
    colors,
    onColorComplete
  } = props;

  return (
    <div className={mergeClassNames(b(), className)}>
      {sortTypes &&
        <SortSwitcher
          className={b("sort-switcher")()}
          types={sortTypes}
          orderBy={sortOrderBy}
          order={sortOrder}
          onOrderByChange={onSortOrderByChange}
          onOrderChange={onSortOrderChange}
        />
      }

      {colors &&
        <SelectColorMenu
          className={b("colors")()}
          origin={colorOrigin}
          triggerOrigin={colorTriggerOrigin}
          colors={colors}
          selectColors={selectColors}
          onComplete={onColorComplete}
        />
      }
    </div>
  );
}

CardGroupControl.defaultProps = {
  colorOrigin: { vertical: "top", horizontal: "right" },
  colorTriggerOrigin: { vertical: "top", horizontal: "right" },
  selectColors: []
};
