// @flow
import React, { Component } from "react";
import { connect } from "react-redux";
import * as BoardActions from "../../../actions/boards";
import { SelectCoverItemDialog } from "../../../components/ui/";
import { getSelectingCoverBoardEntity } from "../../../selectors/boards";
import { getItemEntitiesBySelectingCover } from "../../../selectors/items";

import type { Dispatch } from "redux";
import type { ConnectState } from "../../../types/redux";
import type { BoardState, BoardEntity } from "../../../types/board";
import type { ItemId, ItemEntities } from "../../../types/item";


type Props = {
  dispatch: Dispatch;
  boards: BoardState;
  entity: ?BoardEntity;
  itemEntities: ItemEntities;
};

export class SelectCoverItemDialogContainer extends Component {
  props: Props;

  handleClose = () => {
    this.props.dispatch(BoardActions.selectCoverItemDialogClose());
  }

  handleComplete = (id: ItemId) => {
    const { entity } = this.props;
    if (entity) {
      this.props.dispatch(BoardActions.selectCoverItemRequest(entity.id, id));
    }
  }

  render() {
    const { boards, entity, itemEntities } = this.props;
    const items = itemEntities.map(item => ({
      id: item.id,
      image: item.thumbnail
    }));

    return <SelectCoverItemDialog
      processing={entity ? entity.isUpdating : false}
      open={boards.selectCoverItemDialogOpen}
      items={items}
      selectedId={entity ? entity.Cover : null}
      onRequestClose={this.handleClose}
      onComplete={this.handleComplete}
    />;
  }
}


export default connect(
  (state: ConnectState) => ({
    boards: state.boards,
    entity: getSelectingCoverBoardEntity(state),
    itemEntities: getItemEntitiesBySelectingCover(state)
  })
)(SelectCoverItemDialogContainer);
