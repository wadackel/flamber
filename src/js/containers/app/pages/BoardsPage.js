// @flow
import autoBind from "auto-bind";
import React, { Component } from "react";
import { connect } from "react-redux";
import { push } from "react-router-redux";
import bem from "../../../helpers/bem";
import ExecutionEnvironment from "../../../constants/execution-environment";
import * as OrderBy from "../../../constants/order-by";
import * as SettingActions from "../../../actions/settings";
import * as BoardActions from "../../../actions/boards";
import { getBoardEntities, getSelectedBoardEntities } from "../../../selectors/boards";
import { TrashIcon, BoardIcon } from "../../../components/svg-icons/";
import {
  CardGroup,
  BoardCard,
  IconButton,
  EmptyData,
  ToolBox,
  SortSwitcher,
  RaisedButton,
  Spinner
} from "../../../components/ui/";

import type { Dispatch } from "redux";
import type { ConnectState } from "../../../types/redux";
import type { BoardId, BoardEntities, BoardState } from "../../../types/board";
import type { ItemEntitiesState } from "../../../types/item";


const b = bem("boards-page");

type Props = {
  dispatch: Dispatch;
  boards: BoardState;
  boardEntities: BoardEntities;
  selectedBoardEntities: BoardEntities;
  itemEntities: ItemEntitiesState;
};

export class BoardsPage extends Component {
  constructor(props: Props, context: Object) {
    super(props, context);
    autoBind(this);
  }

  handleEdit(id: BoardId) {
    this.props.dispatch(push(`/app/board/${id}`));
  }

  handleSelect(id: BoardId) {
    this.props.dispatch(BoardActions.selectBoardToggle(id));
  }

  handleDelete(id: BoardId) {
    this.props.dispatch(BoardActions.deleteBoardRequest(id));
  }

  handleSelectDelete() {
    this.props.dispatch(BoardActions.selectedBoardsDeleteRequest());
  }

  // TODO
  handleOrderByChange(orderBy: string) {
    this.props.dispatch(SettingActions.updateBoardsOrderByRequest(orderBy));
  }

  // TODO
  handleOrderChange(order: string) {
    this.props.dispatch(SettingActions.updateBoardsOrderRequest(order));
  }

  handleAddBoardClick() {
    this.props.dispatch(BoardActions.addBoardDialogOpen());
  }

  renderEmptyData() {
    const { boards } = this.props;

    if (
      !ExecutionEnvironment.canUseDOM ||
      boards.isFetching ||
      boards.results.length > 0
    ) {
      return null;
    }

    return <EmptyData
      title="No boards"
      icon={<BoardIcon />}
      action={<RaisedButton onClick={this.handleAddBoardClick}>Add board</RaisedButton>}
    >
      ボードがありません。<br />
      新しいボードを追加しましょう。
    </EmptyData>;
  }

  renderFetchingSpinner() {
    const { boards } = this.props;

    if (!ExecutionEnvironment.canUseDOM || !boards.isFetching) return null;

    return <Spinner className={b("fetching-spinner")()} />;
  }

  render() {
    const {
      // settings: {
      //   boardsLayout,
      //   boardsOrderBy,
      //   boardsOrder
      // },
      boardEntities,
      selectedBoardEntities
      // itemEntities
    } = this.props;

    // TODO
    const boardsLayout = "grid";
    const boardsOrder = "created_at";
    const boardsOrderBy = "asc";

    const hasSelectedBoard = selectedBoardEntities.length > 0;

    return (
      <div className={`container ${b()}`}>
        <div className="card-group-control">
          <SortSwitcher
            className="card-group-control__sort-switcher"
            orderBy={boardsOrderBy}
            order={boardsOrder}
            types={[
              { name: "名前", value: OrderBy.NAME },
              { name: "作成", value: OrderBy.CREATED },
              { name: "最終編集", value: OrderBy.MODIFIED }
            ]}
            onOrderByChange={this.handleOrderByChange}
            onOrderChange={this.handleOrderChange}
          />
        </div>

        {this.renderEmptyData()}
        {this.renderFetchingSpinner()}

        <CardGroup
          columnWidth={300}
          gutter={30}
          layout={boardsLayout}
        >
          {boardEntities.map(board => {
            // TODO
            // const firstItem = board.items.length > 0 ? itemEntities[board.items[0]] : null;
            const firstItem = null;

            return <BoardCard
              key={board.id}
              id={board.id}
              processing={board.isDeleting}
              selected={board.select}
              title={board.name}
              image={firstItem ? firstItem.thumbnail : "/images/default.png"}
              layout={boardsLayout}
              itemCount={0}
              lastModified={new Date(board.updated_at)}
              onClick={this.handleEdit}
              onEdit={this.handleEdit}
              onSelect={this.handleSelect}
              onDelete={this.handleDelete}
            />;
          })}
        </CardGroup>

        <ToolBox
          open={hasSelectedBoard}
          text={`${selectedBoardEntities.length}個のボード`}
          actions={[
            <IconButton
              type="primary"
              tooltip="削除"
              icon={<TrashIcon />}
              onClick={this.handleSelectDelete}
            />
          ]}
        />
      </div>
    );
  }
}

// TODO
export default connect(
  (state: ConnectState) => ({
    boards: state.boards,
    boardEntities: getBoardEntities(state, "created_at", "asc"),
    selectedBoardEntities: getSelectedBoardEntities(state),
    itemEntities: state.entities.items
  })
)(BoardsPage);
