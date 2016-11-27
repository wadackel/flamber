// @flow
import React, { Component } from "react";
import { connect } from "react-redux";
import * as ItemActions from "../../../actions/items";
import { getBoardEntities } from "../../../selectors/boards";
import { AddItemURLDialog } from "../../../components/ui/";

import type { Dispatch } from "redux";
import type { ConnectState } from "../../../types/redux";
import type { BoardState, BoardId, BoardEntities } from "../../../types/board";
import type { ItemState } from "../../../types/item";


type Props = {
  dispatch: Dispatch;
  boards: BoardState;
  boardEntities: BoardEntities;
  items: ItemState;
};

export class AddItemURLDialogContainer extends Component {
  props: Props;

  handleClose = () => {
    this.props.dispatch(ItemActions.addItemURLDialogClose());
  }

  handleAdd = (url: string, board: BoardId) => {
    this.props.dispatch(ItemActions.addItemURLRequest(url, board));
  }

  isProcessing(): boolean | string {
    const { boards, items } = this.props;

    if (boards.isFetching) {
      return true;
    }

    if (items.isScreenshotTaking) {
      return "スクリーンショットを撮影中...";
    }

    if (items.isAdding) {
      return "アイテムを追加中...";
    }

    return false;
  }

  render() {
    const { boards, boardEntities, items } = this.props;
    const selectBoards = boardEntities.map(board => ({
      name: board.name,
      value: board.id
    }));

    return <AddItemURLDialog
      processing={this.isProcessing()}
      open={items.addURLDialogOpen}
      selectBoards={selectBoards}
      defaultBoard={boards.currentId}
      onRequestClose={this.handleClose}
      onRequestAdd={this.handleAdd}
    />;
  }
}


export default connect(
  (state: ConnectState) => ({
    boards: state.boards,
    boardEntities: getBoardEntities(state),
    items: state.items
  })
)(AddItemURLDialogContainer);
