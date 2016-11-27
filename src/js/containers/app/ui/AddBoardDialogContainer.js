// @flow
import React, { Component } from "react";
import { connect } from "react-redux";
import * as BoardActions from "../../../actions/boards";
import { AddBoardDialog } from "../../../components/ui/";

import type { Dispatch } from "redux";
import type { ConnectState } from "../../../types/redux";
import type { BoardState } from "../../../types/board";


type Props = {
  dispatch: Dispatch;
  boards: BoardState;
};

export class AddBoardDialogContainer extends Component {
  props: Props;

  handleClose = () => {
    this.props.dispatch(BoardActions.addBoardDialogClose());
  }

  handleAdd = (name: string) => {
    // TODO: Secret
    this.props.dispatch(BoardActions.addBoardRequest(name, true));
  }

  render() {
    const { boards } = this.props;

    return <AddBoardDialog
      processing={boards.isAdding}
      open={boards.addDialogOpen}
      onRequestClose={this.handleClose}
      onRequestAdd={this.handleAdd}
    />;
  }
}


export default connect(
  (state: ConnectState) => ({
    boards: state.boards
  })
)(AddBoardDialogContainer);
