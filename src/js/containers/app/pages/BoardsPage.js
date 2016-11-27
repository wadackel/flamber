// @flow
import React, { Component } from "react";
import ExecutionEnvironment from "exenv";
import { connect } from "react-redux";
import { push } from "react-router-redux";
import { SelectableGroup, createSelectable } from "react-selectable";
import bem from "../../../helpers/bem";
import * as OptionActions from "../../../actions/options";
import * as BoardActions from "../../../actions/boards";
import { getBoardEntities, getSelectedBoardEntities } from "../../../selectors/boards";
import { createMultipleSelectableGroup } from "../../../components/hoc/";
import { TrashIcon, BoardIcon } from "../../../components/svg-icons/";
import {
  CardGroup,
  CardGroupControl,
  BoardCard,
  IconButton,
  EmptyData,
  ToolBox,
  RaisedButton,
  Spinner
} from "../../../components/ui/";
import { SelectCoverItemDialogContainer } from "../ui/";

import type { Dispatch } from "redux";
import type { ConnectState } from "../../../types/redux";
import type { OptionsState } from "../../../types/options";
import type { BoardId, BoardEntities, BoardState } from "../../../types/board";
import type { ItemEntitiesState } from "../../../types/item";
import type { OrderBy, Order } from "../../../types/prop-types";


const b = bem("boards-page");
const MultipleSelectableGroup = createMultipleSelectableGroup(SelectableGroup);
const SelectableBoard = createSelectable(BoardCard);

type Props = {
  dispatch: Dispatch;
  options: OptionsState;
  boards: BoardState;
  boardEntities: BoardEntities;
  selectedBoardEntities: BoardEntities;
  itemEntities: ItemEntitiesState;
};

export class BoardsPage extends Component {
  props: Props;

  handleEdit = (id: BoardId) => {
    this.props.dispatch(push(`/app/board/${id}`));
  }

  handleSelect = (id: BoardId) => {
    this.props.dispatch(BoardActions.selectBoardToggle(id));
  }

  handleDelete = (id: BoardId) => {
    this.props.dispatch(BoardActions.deleteBoardRequest(id));
  }

  handleCover = (id: BoardId) => {
    this.props.dispatch(BoardActions.selectCoverItemDialogOpen(id));
  }

  handleSelectDelete = () => {
    this.props.dispatch(BoardActions.selectedBoardsDeleteRequest());
  }

  handleOrderByChange = (orderBy: OrderBy) => {
    this.props.dispatch(OptionActions.updateBoardsOrderByRequest(orderBy));
  }

  handleOrderChange = (order: Order) => {
    this.props.dispatch(OptionActions.updateBoardsOrderRequest(order));
  }

  handleAddBoardClick = () => {
    this.props.dispatch(BoardActions.addBoardDialogOpen());
  }

  handleSelection = (ids: Array<BoardId>) => {
    this.props.dispatch(BoardActions.setSelectBoards(ids));
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
      options: {
        boardsLayout,
        boardsOrderBy,
        boardsOrder
      },
      boardEntities,
      selectedBoardEntities
    } = this.props;

    const hasSelectedBoard = selectedBoardEntities.length > 0;

    return (
      <MultipleSelectableGroup
        className={`container ${b()}`}
        selectedKeys={selectedBoardEntities.map(o => o.id)}
        onSelection={this.handleSelection}
        tolerance={5}
        selectOnMouseMove={false}
      >
        <CardGroupControl
          sortTypes={[
            { name: "名前", value: "name" },
            { name: "作成", value: "created_at" }
          ]}
          sortOrderBy={boardsOrderBy}
          sortOrder={boardsOrder}
          onSortOrderByChange={this.handleOrderByChange}
          onSortOrderChange={this.handleOrderChange}
        />

        {this.renderEmptyData()}
        {this.renderFetchingSpinner()}

        <CardGroup
          columnWidth={300}
          gutter={30}
          layout={boardsLayout}
        >
          {boardEntities.map(board => (
            <SelectableBoard
              key={board.id}
              id={board.id}
              selectableKey={board.id}
              selectable={hasSelectedBoard}
              selected={board.select}
              processing={board.isDeleting}
              title={board.name}
              image={board.coverImage ? board.coverImage : "/images/default.png"}
              layout={boardsLayout}
              itemCount={board.Items.length}
              lastModified={new Date(board.updated_at)}
              onClick={this.handleEdit}
              onEdit={this.handleEdit}
              onSelect={this.handleSelect}
              onDelete={this.handleDelete}
              onCover={this.handleCover}
            />
          ))}
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

        <SelectCoverItemDialogContainer />
      </MultipleSelectableGroup>
    );
  }
}


export default connect(
  (state: ConnectState) => ({
    options: state.options,
    boards: state.boards,
    boardEntities: getBoardEntities(
      state,
      state.options.boardsOrderBy,
      state.options.boardsOrder
    ),
    selectedBoardEntities: getSelectedBoardEntities(state),
    itemEntities: state.entities.items
  })
)(BoardsPage);
