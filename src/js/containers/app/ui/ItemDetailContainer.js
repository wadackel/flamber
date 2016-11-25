// @flow
import moment from "moment";
import React, { Component } from "react";
import KeyHandler from "react-key-handler";
import { connect } from "react-redux";
import * as ItemActions from "../../../actions/items";
import { getCurrentItem } from "../../../selectors/items";
import bem from "../../../helpers/bem";
import {
  ItemDetailMetaContainer,
  ItemDetailPaletteContainer,
  ItemDetailTagContainer
} from "./";
import { Drawer } from "../../../components/ui/";

import type { Dispatch } from "redux";
import type { ConnectState } from "../../../types/redux";
import type { ItemState, ItemEntity } from "../../../types/item";


const b = bem("item-detail-container");


type GroupProps = {
  title?: string;
  type: string;
  children?: any;
};

const Group = ({ title, type, children }: GroupProps) => (
  <div className={b("group", { [type]: true })()}>
    {title && <h4 className={b("group__title")()}>{title}</h4>}
    <div className={b("group__body")}>
      {children}
    </div>
  </div>
);


type Props = {
  dispatch: Dispatch;
  items: ItemState;
  currentItem: ?ItemEntity;
};

export class ItemDetailContainer extends Component {
  props: Props;

  handleToggle = () => {
    this.props.dispatch(ItemActions.itemDetailDrawerToggle());
  }

  render() {
    const { items, currentItem } = this.props;
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
            <KeyHandler keyEventName="keydown" keyValue="m" onKeyHandle={this.handleToggle} />

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
              <p>{moment(currentItem.created_at).format("YYYY/MM/DD HH:mm:ss")}</p>
            </Group>
          </div>
        }
      </Drawer>
    );
  }
}

export default connect(
  (state: ConnectState) => ({
    items: state.items,
    currentItem: getCurrentItem(state)
  })
)(ItemDetailContainer);
