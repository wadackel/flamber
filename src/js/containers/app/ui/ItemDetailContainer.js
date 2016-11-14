/* eslint-disable */
import _ from "lodash";
import autoBind from "auto-bind";
import moment from "moment";
import React, { Component, PropTypes } from "react";
import ExecutionEnvironment from "exenv";
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
import bem from "../../../helpers/bem";
import {
  ItemDetailMetaContainer,
  ItemDetailPaletteContainer,
  ItemDetailTagContainer
} from "./";
import {
  Drawer,
  Spinner
} from "../../../components/ui/";
import {
  MoreVertIcon
} from "../../../components/svg-icons/";

const b = bem("item-detail-container");

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

export class ItemDetailContainer extends Component {
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
            <Group type="meta">
              <ItemDetailMetaContainer />
            </Group>

            <Group title="Colors" type="colors">
              <ItemDetailPaletteContainer />
            </Group>

            <Group title="Tags" type="tags">
              <ItemDetailTagContainer />
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
)(ItemDetailContainer);
