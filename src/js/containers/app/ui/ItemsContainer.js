// @flow
import autoBind from "auto-bind";
import React, { Component } from "react";
import { connect } from "react-redux";
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
  CardGroup,
  ItemCard,
  IconButton,
  SelectBoardDialog,
  ToolBox,
  IconMenu,
  MenuItem,
  SortSwitcher,
  Spinner
} from "../../../components/ui/";
import {
  FolderIcon,
  TrashIcon,
  StarIcon,
  MoreVertIcon
} from "../../../components/svg-icons/";

import type { Dispatch } from "redux";
import type { ConnectState } from "../../../types/redux";
import type { BoardState, BoardId, BoardEntity, BoardEntities } from "../../../types/board";
import type { ItemState, ItemId, ItemEntity, ItemEntities } from "../../../types/item";
import type { Order, OrderBy } from "../../../types/prop-types";


const b = bem("items-container");

type Props = {
  dispatch: Dispatch;
  boards: BoardState;
  rawBoardEntities: BoardEntities;
  items: ItemState;
  itemEntities: ItemEntities;
  selectedItemEntities: ItemEntities;
  currentBoard: ?BoardEntity;
  currentItem: ?ItemEntity;
  emptyComponent: React$Element<any>;
};

type State = {
  selectMenuOpen: boolean;
  selectMenuTrigger: ?HTMLElement;
};

export class ItemsContainer extends Component {
  props: Props;
  state: State;

  constructor(props: Props, context: Object) {
    super(props, context);

    this.state = {
      selectMenuOpen: false,
      selectMenuTrigger: null
    };

    autoBind(this);
  }

  // TODO
  handleOrderByChange(orderBy: OrderBy) {
    console.log("TODO: updateItemsOrderBy", orderBy);
    // this.props.dispatch(SettingActions.updateItemsOrderByRequest(orderBy));
  }

  // TODO
  handleOrderChange(order: Order) {
    console.log("TODO: updateItemsOrder", order);
    // this.props.dispatch(SettingActions.updateItemsOrderRequest(order));
  }

  handleDetail(id: ItemId) {
    this.props.dispatch(ItemActions.setCurrentItem(id));
  }

  handleSelect(id: ItemId) {
    this.props.dispatch(ItemActions.selectItemToggle(id));
  }

  handleStar(id: ItemId) {
    this.props.dispatch(ItemActions.starItemToggleRequest(id));
  }

  handleMove(id: ItemId) {
    this.props.dispatch(ItemActions.moveItemSelectBoardOpen(id));
  }

  handleSelectMove() {
    this.props.dispatch(ItemActions.selectedItemsMoveOpen());
  }

  handleSelectBoard(boardId: BoardId) {
    if (this.props.items.moveItems.length > 0) {
      this.props.dispatch(ItemActions.moveItemRequest(boardId));
    } else {
      this.props.dispatch(ItemActions.selectedItemsMoveRequest(boardId));
    }
  }

  handleSelectBoardDialogClose() {
    if (this.props.items.moveItems.length > 0) {
      this.props.dispatch(ItemActions.moveItemSelectBoardClose());
    } else {
      this.props.dispatch(ItemActions.selectedItemsMoveClose());
    }
  }

  handleDelete(id: ItemId) {
    this.props.dispatch(ItemActions.deleteItemRequest(id));
  }

  handleSelectDelete() {
    this.props.dispatch(ItemActions.selectedItemsDeleteRequest());
  }

  handleSelectStar() {
    const { dispatch, selectedItemEntities } = this.props;
    const isAllStar = this.isAllStarByItemEntities(selectedItemEntities);
    dispatch(ItemActions.selectedItemsStarRequest(!isAllStar));
  }

  handleSelectMenuItemClick(menuItem: MenuItem, value: Function) {
    this.props.dispatch(value());
  }

  isAllStarByItemEntities(entities: ItemEntities): boolean {
    return entities.every(entity => entity.star);
  }

  renderEmptyData() {
    const {
      boards,
      items,
      itemEntities,
      emptyComponent
    } = this.props;

    if (
      !ExecutionEnvironment.canUseDOM ||
      items.isFetching ||
      itemEntities.length > 0 ||
      boards.isFetching
    ) {
      return null;
    }

    return emptyComponent;
  }

  renderFetchingSpinner() {
    const { items, boards } = this.props;

    if (
      (!ExecutionEnvironment.canUseDOM || !items.isFetching) &&
      !boards.isFetching
    ) {
      return null;
    }

    return <Spinner className={b("fetching-spinner")()} />;
  }

  render() {
    const {
      rawBoardEntities,
      currentBoard,
      currentItem,
      items,
      itemEntities,
      selectedItemEntities
      // settings: {
      //   itemsLayout,
      //   itemsSize,
      //   itemsOrderBy,
      //   itemsOrder
      // }
    } = this.props;

    const itemsLayout = "gallery"; // TODO
    const itemsSize = 300; // TODO
    const itemsOrderBy = "created_at"; // TODO
    const itemsOrder = "desc"; // TODO

    const hasSelectedItems = selectedItemEntities.length > 0;
    const isAllStar = this.isAllStarByItemEntities(selectedItemEntities);
    const selectBoards = rawBoardEntities
      .filter(entity => {
        if (currentBoard) {
          return currentBoard.id !== entity.id;
        } else if (currentItem) {
          return currentItem.board_id !== entity.id;
        }
        return true;
      })
      .map(entity => ({
        value: entity.id,
        name: entity.name
      }));

    return (
      <div className={`container ${b()}`}>
        <div className="card-group-control">
          <SortSwitcher
            className="card-group-control__sort-switcher"
            orderBy={itemsOrderBy}
            order={itemsOrder}
            types={[
              { name: "名前", value: "name" },
              { name: "作成", value: "created_at" },
              { name: "最終閲覧", value: "viewed_at" }
            ]}
            onOrderByChange={this.handleOrderByChange}
            onOrderChange={this.handleOrderChange}
          />
        </div>

        {this.renderEmptyData()}
        {this.renderFetchingSpinner()}

        <CardGroup
          columnWidth={itemsSize}
          layout={itemsLayout}
        >
          {itemEntities.map(item =>
            <ItemCard
              key={item.id}
              id={item.id}
              processing={item.isUpdating || item.isMoving || item.isDeleting}
              selected={item.select}
              layout={itemsLayout}
              title={item.name}
              url={item.url}
              image={item.thumbnail}
              imageWidth={item.width}
              imageHeight={item.height}
              star={item.star}
              colors={item.palette}
              onDetailClick={this.handleDetail}
              onSelect={this.handleSelect}
              onStar={this.handleStar}
              onMove={this.handleMove}
              onDelete={this.handleDelete}
            />
          )}
        </CardGroup>

        <SelectBoardDialog
          processing={items.isMoving}
          open={items.selectBoardDialogOpen}
          boards={selectBoards}
          onSelect={this.handleSelectBoard}
          onRequestClose={this.handleSelectBoardDialogClose}
        />

        <ToolBox
          open={hasSelectedItems}
          text={`${selectedItemEntities.length}個のアイテム`}
          actions={[
            <IconButton
              tooltip={isAllStar ? "スターを外す" : "スターを付ける"}
              icon={<StarIcon />}
              onClick={this.handleSelectStar}
            />,
            <IconButton
              tooltip="移動"
              icon={<FolderIcon />}
              onClick={this.handleSelectMove}
            />,
            <IconButton
              tooltip="削除"
              icon={<TrashIcon />}
              onClick={this.handleSelectDelete}
            />,
            <IconMenu
              icon={<IconButton icon={<MoreVertIcon />} />}
              tooltip="選択"
              origin={{ vertical: "bottom", horizontal: "right" }}
              triggerOrigin={{ vertical: "bottom", horizontal: "right" }}
              onItemClick={this.handleSelectMenuItemClick}
            >
              {itemEntities.length !== selectedItemEntities.length &&
                <MenuItem primary="すべて選択" value={ItemActions.selectAllItem} />
              }
              <MenuItem primary="スター付きを選択" value={ItemActions.selectStarItem} />
              <MenuItem primary="選択を解除" value={ItemActions.unselectAllItem} />
            </IconMenu>
          ]}
        />

      </div>
    );
  }
}

export default connect(
  (state: ConnectState) => ({
    boards: state.boards,
    rawBoardEntities: getRawBoardEntities(state),
    items: state.items,
    itemEntities: getVisibleItemEntities(state),
    selectedItemEntities: getSelectedItemEntities(state),
    currentBoard: getCurrentBoard(state),
    currentItem: getCurrentItem(state)
  })
)(ItemsContainer);
