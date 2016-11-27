// @flow
import React, { Component } from "react";
import { connect } from "react-redux";
import * as ItemActions from "../../../actions/items";
import { getBoardEntities } from "../../../selectors/boards";
import { AddItemFileDialog } from "../../../components/ui/";

import type { Dispatch } from "redux";
import type { ConnectState } from "../../../types/redux";
import type { Palette } from "../../../types/prop-types";
import type { BoardState, BoardId, BoardEntities } from "../../../types/board";
import type { ItemState } from "../../../types/item";


type Props = {
  dispatch: Dispatch;
  boards: BoardState;
  boardEntities: BoardEntities;
  items: ItemState;
};

export class AddItemFileDialogContainer extends Component {
  props: Props;

  handleClose = () => {
    this.props.dispatch(ItemActions.addItemFileDialogClose());
  }

  handleAdd = (file: File, palette: Palette, board: BoardId) => {
    this.props.dispatch(ItemActions.addItemFileRequest(board, file, palette));
  }

  render() {
    const { boards, boardEntities, items } = this.props;
    const selectBoards = boardEntities.map(board => ({
      name: board.name,
      value: board.id
    }));
    const dropFile = null;

    return <AddItemFileDialog
      processing={boards.isFetching || items.isAdding}
      open={items.addFileDialogOpen}
      file={dropFile}
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
)(AddItemFileDialogContainer);
