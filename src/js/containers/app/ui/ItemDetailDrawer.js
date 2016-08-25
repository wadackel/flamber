/* eslint-disable */
import _ from "lodash";
import autoBind from "auto-bind";
import moment from "moment";
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

function Group({ title, type, children }) {
  return (
    <div className={b("group", { [type]: true })()}>
      {title && <h4 className={b("group__title")()}>{title}</h4>}
      <div className={b("group__body")}>
        {children}
      </div>
    </div>
  );
}

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
      items,
      currentItem
    } = this.props;

    const modifier = {
      show: currentItem && items.detailDrawerOpen
    };

    return (
      <Drawer
        className={b(modifier)()}
        direction="right"
        open={items.detailDrawerOpen}
      >
        {currentItem &&
          <div>
            <Group type="main">
              <div className={b("item-header")}>
                <h2 className={b("item-name")()}>{currentItem.name}</h2>
                <p className={b("item-url")}>{currentItem.url}</p>
              </div>
              <p className={b("item-detail")}>{currentItem.description}</p>
            </Group>

            <Group title="Colors" type="colors">
              TODO
            </Group>

            <Group title="Tags" type="tags">
              TODO
            </Group>

            <Group title="Date" type="date">
              <p>{moment(currentItem.created).format("YYYY/MM/DD HH:mm:ss")}</p>
            </Group>
          </div>
        }
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
