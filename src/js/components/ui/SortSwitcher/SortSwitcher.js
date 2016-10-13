// @flow
import autoBind from "auto-bind";
import React, { Component } from "react";
import bem from "../../../helpers/bem";
import mergeClassNames from "../../../helpers/merge-class-names";
import { DropDownMenu, MenuItem, IconButton } from "../";
import { ArrowTopIcon, ArrowBottomIcon } from "../../svg-icons/";
import type { OrderBy, Order } from "../../../types/prop-types";

const b = bem("sort-switcher");

type SortType = {
  value: any;
  name: string;
};

type Props = {
  className?: string;
  orderBy: OrderBy;
  order: Order;
  types: Array<SortType>;
  onChange?: Function;
  onOrderByChange?: Function;
  onOrderChange?: Function;
};

export default class SortSwitcher extends Component {
  props: Props;

  static defaultProps = {
    order: "asc",
    onChange: () => {},
    onOrderByChange: () => {},
    onOrderChange: () => {}
  };

  constructor(props: Props, context: Object) {
    super(props, context);
    autoBind(this);
  }

  handleOrderByChange(orderBy: OrderBy) {
    if (typeof this.props.onOrderByChange === "function") {
      this.props.onOrderByChange(orderBy);
    }

    this.triggerChange(orderBy, this.props.order);
  }

  handleOrderChange() {
    const nextOrder = this.props.order === "asc" ? "desc" : "asc";

    if (typeof this.props.onOrderChange === "function") {
      this.props.onOrderChange(nextOrder);
    }

    this.triggerChange(this.props.orderBy, nextOrder);
  }

  triggerChange(orderBy: OrderBy, order: Order): void {
    if (typeof this.props.onChange === "function") {
      this.props.onChange(orderBy, order);
    }
  }

  render() {
    const {
      className,
      orderBy,
      order,
      types
    } = this.props;

    const isOrderAsc = order === "asc";

    const children = types.map(({ value, name }) =>
      <MenuItem key={value} value={value} primary={name} />
    );

    const orderIcon = isOrderAsc
      ? <ArrowTopIcon />
      : <ArrowBottomIcon />;

    return (
      <div className={mergeClassNames(b(), className)}>
        <DropDownMenu
          className={b("types")()}
          value={orderBy}
          onChange={this.handleOrderByChange}
          origin={{ vertical: "top", horizontal: "right" }}
          triggerOrigin={{ vertical: "top", horizontal: "right" }}
        >
          {children}
        </DropDownMenu>
        <IconButton
          className={b("order")()}
          icon={orderIcon}
          size="sm"
          tooltip={isOrderAsc ? "降順" : "昇順"}
          onClick={this.handleOrderChange}
        />
      </div>
    );
  }
}
