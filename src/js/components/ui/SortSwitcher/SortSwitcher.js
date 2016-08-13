import React, { Component, PropTypes } from "react";
import * as Order from "../../../constants/order";
import * as OriginalPropTypes from "../../../constants/prop-types";
import bem from "../../../helpers/bem";
import mergeClassNames from "../../../helpers/merge-class-names";
import bindHandlers from "../../../helpers/bind-handlers";
import { DropDownMenu, MenuItem, IconButton } from "../";
import { ArrowTopIcon, ArrowBottomIcon } from "../../svg-icons/";

const b = bem("sort-switcher");

export default class SortSwitcher extends Component {
  static propTypes = {
    className: PropTypes.string,
    orderBy: PropTypes.any,
    order: OriginalPropTypes.order,
    types: PropTypes.arrayOf(PropTypes.shape({
      value: PropTypes.any,
      name: PropTypes.string
    })),
    onChange: PropTypes.func,
    onOrderByChange: PropTypes.func,
    onOrderChange: PropTypes.func
  };

  static defaultProps = {
    order: Order.ASC,
    onChange: () => {},
    onOrderByChange: () => {},
    onOrderChange: () => {}
  };

  constructor(props, context) {
    super(props, context);

    bindHandlers([
      "handleOrderByChange",
      "handleOrderChange"
    ], this);
  }

  handleOrderByChange(orderBy) {
    this.props.onOrderByChange(orderBy);
    this.props.onChange(orderBy, this.props.order);
  }

  handleOrderChange() {
    const nextOrder = this.props.order === Order.ASC
      ? Order.DESC
      : Order.ASC;

    this.props.onOrderChange(nextOrder);
    this.props.onChange(this.props.orderBy, nextOrder);
  }

  render() {
    const {
      className,
      orderBy,
      order,
      types
    } = this.props;

    const isOrderAsc = order === Order.ASC;

    const children = types.map(({ value, name }) =>
      <MenuItem key={value} value={value} text={name} />
    );

    const orderIcon = isOrderAsc
      ? <ArrowTopIcon />
      : <ArrowBottomIcon />;

    return (
      <div className={mergeClassNames(b(), className)}>
        <DropDownMenu
          className={b("types")}
          value={orderBy}
          onChange={this.handleOrderByChange}
          origin={{ vertical: "top", horizontal: "right" }}
          triggerOrigin={{ vertical: "top", horizontal: "right" }}
        >
          {children}
        </DropDownMenu>
        <IconButton
          className={b("order")}
          icon={orderIcon}
          size="sm"
          tooltip={isOrderAsc ? "昇順" : "降順"}
          onClick={this.handleOrderChange}
        />
      </div>
    );
  }
}
