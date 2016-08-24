/* eslint-disable */
import _ from "lodash";
import autoBind from "auto-bind";
import React, { Component, PropTypes } from "react";
import MDSpinner from "react-md-spinner";
import { connect } from "react-redux";
import { push } from "react-router-redux";
import * as OrderBy from "../../../constants/order-by";
import * as Layout from "../../../constants/layouts";
import * as SettingActions from "../../../actions/settings";
import * as BoardActions from "../../../actions/boards";
import * as ItemActions from "../../../actions/items";
import { getRawBoardEntities, getCurrentBoard } from "../../../selectors/boards";
import {
  getVisibleItemEntities,
  getSelectedItemEntities,
  getCurrentItem
} from "../../../selectors/items";
import ExecutionEnvironment from "../../../constants/execution-environment";
import bem from "../../../helpers/bem";
import {
  Drawer
} from "../../../components/ui/";
import {
  MoreVertIcon
} from "../../../components/svg-icons/";

const b = bem("item-detail-drawer");

export class ItemDetailDrawer extends Component {
  static propTypes = {
  };

  static defaultProps = {
  };

  constructor(props, context) {
    super(props, context);

    this.state = {};

    autoBind(this);
  }

  render() {
    const {
      items
    } = this.props;

    const modifier = {
      show: items.detailDrawerOpen
    };

    return (
      <Drawer
        className={b(modifier)()}
        direction="right"
        open={items.detailDrawerOpen}
      >
        TODO
      </Drawer>
    );
  }
}

export default connect(
  state => ({
    items: state.items,
    currentItem: getCurrentItem(state)
  }),
  null,
  null,
  { pure: false }
)(ItemDetailDrawer);
