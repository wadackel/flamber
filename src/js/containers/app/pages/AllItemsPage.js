import autoBind from "auto-bind";
import React, { Component } from "react";
import { connect } from "react-redux";
import bem from "../../../helpers/bem";
import * as ItemVisibilityFilters from "../../../constants/item-visibility-filters";
import * as BoardActions from "../../../actions/boards";
import * as ItemActions from "../../../actions/items";
import { ItemsContainer } from "../ui/";
import { EmptyData, RaisedButton } from "../../../components/ui/";
import { PictureLinkIcon } from "../../../components/svg-icons/";

import type { Dispatch } from "redux";
import type { BoardState } from "../../../types/board";


const b = bem("all-items-page");

type Props = {
  dispatch: Dispatch;
  boards: BoardState;
};

export class AllItemsPage extends Component {
  props: Props;

  constructor(props, context) {
    super(props, context);
    autoBind(this);
  }

  componentDidMount() {
    this.props.dispatch(ItemActions.setItemVisibilityFilter(
      ItemVisibilityFilters.ALL
    ));
  }

  handleAddBoardClick() {
    this.props.dispatch(BoardActions.addBoardDialogOpen());
  }

  handleAddItemClick() {
    this.props.dispatch(ItemActions.addItemURLDialogOpen());
  }

  renderBoardEmptyData() {
    return <EmptyData
      title="No boards & items"
      icon={<PictureLinkIcon />}
      action={<RaisedButton onClick={this.handleAddBoardClick}>Add board</RaisedButton>}
    >
      アイテムがありません。<br />
      まずは新しいボードを追加しましょう。
    </EmptyData>;
  }

  renderItemEmptyData() {
    return <EmptyData
      title="No items"
      icon={<PictureLinkIcon />}
      action={<RaisedButton onClick={this.handleAddItemClick}>Add item</RaisedButton>}
    >
      アイテムがありません。<br />
      新しいアイテムを追加しましょう。
    </EmptyData>;
  }

  renderEmptyData() {
    const { boards } = this.props;

    return boards.results.length === 0
      ? this.renderBoardEmptyData()
      : this.renderItemEmptyData();
  }

  render() {
    return (
      <div className={b()}>
        <ItemsContainer
          emptyComponent={this.renderEmptyData()}
        />
      </div>
    );
  }
}

export default connect(
  state => ({
    boards: state.boards
  })
)(AllItemsPage);
