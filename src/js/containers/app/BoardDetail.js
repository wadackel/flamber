/* eslint-disable */
import React, { Component, PropTypes } from "react";
import { connect } from "react-redux";
import { push } from "react-router-redux";
import * as Layout from "../../constants/layouts";
import { currentBoard } from "../../actions/boards";
import {
  clearItems,
  selectItemToggle,
  favoriteItemToggleRequest,
  moveItemBoardRequest,
  deleteItemRequest,
  selectedItemsMoveRequest,
  selectedItemsFavoriteRequest,
  selectedItemsDeleteRequest,
} from "../../actions/items";
import { getBoardByIdFromBoards } from "../../selectors/boards";
import { getSelectedItemsFromItems, getItemByIdFromItems } from "../../selectors/items";
import bem from "../../helpers/bem";
import bindHandlers from "../../helpers/bind-handlers";
import {
  CardGroup,
  ItemCard,
  IconButton,
  SelectBoardDialog,
  Snackbar,
  ToolBox
} from "../../components/ui/";
import {
  FolderIcon,
  TrashIcon,
  StarIcon
} from "../../components/svg-icons/";

const b = bem("board-detail");

export class BoardDetail extends Component {
  static propTypes = {
  };

  static defaultProps = {
  };

  constructor(props, context) {
    super(props, context);

    this.state = {
      moveItem: null,
      nextBoardId: null,
      selectBoardDialogOpen: false,
      moveItemSnackbarOpen: false,
      moveItemSnackbarMessage: ""
    };

    bindHandlers([
      "handleSelect",
      "handleFavorite",
      "handleMove",
      "handleDelete",
      "handleBoardSelect",
      "handleDialogClose",
      "handleMoveActionClick",
      "handleMoveItemSnackbarClose",

      "handleSelectedItemsMove",
      "handleSelectedItemsStar",
      "handleSelectedItemsDelete"
    ], this);
  }

  componentDidMount() {
    this.props.dispatch(currentBoard(this.props.params.id));
  }

  componentWillUnmount() {
    this.props.dispatch(clearItems());
  }

  componentWillReceiveProps(nextProps) {
    const { props } = this;

    if (props.params.id !== nextProps.params.id) {
      this.props.dispatch(currentBoard(nextProps.params.id));
    }

    if (props.items.isMoving && !nextProps.items.isMoving) {
      const { moveItem } = this.state;

      this.setState({
        selectBoardDialogOpen: false,
        moveItemSnackbarOpen: true,
        moveItemSnackbarMessage: nextProps.items.error
          ? "アイテムの移動に失敗しました"
          : `${moveItem != null ? `「${moveItem.name}」` : "選択したアイテム"}を移動しました`
      });
    }
  }

  handleSelect(id) {
    this.props.dispatch(selectItemToggle(id));
  }

  handleFavorite(id) {
    this.props.dispatch(favoriteItemToggleRequest(id));
  }

  handleMove(id) {
    this.setState({
      moveItem: getItemByIdFromItems(this.props.items, id),
      selectBoardDialogOpen: true,
      moveItemSnackbarOpen: false
    });
  }

  handleDelete(id) {
    this.props.dispatch(deleteItemRequest(id));
  }

  handleBoardSelect(boardId) {
    const { moveItem } = this.state;

    // Single
    if (moveItem != null) {
      this.props.dispatch(moveItemBoardRequest({
        id: moveItem._id,
        boardId
      }));

    // Multiple
    } else {
      this.props.dispatch(selectedItemsMoveRequest(boardId));
    }

    this.setState({
      nextBoardId: boardId
    });
  }

  handleDialogClose() {
    this.setState({
      selectBoardDialogOpen: false
    });
  }

  handleMoveActionClick() {
    const { nextBoardId } = this.state;

    this.props.dispatch(push(`/app/board/${nextBoardId}`));

    this.setState({
      moveItemSnackbarOpen: false,
      moveItemSnackbarMessage: ""
    });
  }

  handleMoveItemSnackbarClose() {
    this.setState({
      moveItemSnackbarOpen: false,
      moveItemSnackbarMessage: ""
    });
  }

  handleSelectedItemsMove() {
    this.setState({
      moveItem: null,
      selectBoardDialogOpen: true,
      moveItemSnackbarOpen: false
    });
  }

  handleSelectedItemsStar() {
    const selectedItems = getSelectedItemsFromItems(this.props.items);
    const isAllFavorite = this.isEntitiesAllFavorite(selectedItems);

    this.props.dispatch(selectedItemsFavoriteRequest(!isAllFavorite));
  }

  handleSelectedItemsDelete() {
    this.props.dispatch(selectedItemsDeleteRequest());
  }

  isEntitiesAllFavorite(entities) {
    return entities.every(o => o.favorite);
  }

  render() {
    const {
      boards,
      items,
      settings: {
        itemsLayout,
        itemsSize
      }
    } = this.props;

    const {
      selectBoardDialogOpen,
      moveItemSnackbarOpen,
      moveItemSnackbarMessage
    } = this.state;

    const selectBoards = boards.entities
      .filter(board => {
        return board._id !== boards.currentBoardId
      })
      .map(board => ({
          name: board.name,
          value: board._id
      }));

    const selectedItems = getSelectedItemsFromItems(items);
    const isSelectedItemsAllFavorite = this.isEntitiesAllFavorite(selectedItems);

    return (
      <div className={`container ${b()}`}>
        <CardGroup
          columnWidth={itemsSize}
          layout={itemsLayout}
        >
          {items.entities.map(item =>
            <ItemCard
              key={item._id}
              id={item._id}
              processing={item.isUpdating || item.isMoving || item.isDeleting}
              selected={item.select}
              layout={itemsLayout}
              title={item.name}
              image={item.thumbnail}
              imageWidth={item.width}
              imageHeight={item.height}
              favorite={item.favorite}
              colors={item.palette}
              onSelect={this.handleSelect}
              onFavorite={this.handleFavorite}
              onMove={this.handleMove}
              onDelete={this.handleDelete}
            />
          )}
        </CardGroup>

        <SelectBoardDialog
          processing={items.isMoving}
          open={selectBoardDialogOpen}
          boards={selectBoards}
          onSelect={this.handleBoardSelect}
          onRequestClose={this.handleDialogClose}
        />

        <Snackbar
          open={moveItemSnackbarOpen}
          message={moveItemSnackbarMessage}
          action={items.error ? null : "Show"}
          onActionClick={this.handleMoveActionClick}
          onRequestClose={this.handleMoveItemSnackbarClose}
        />

        <ToolBox
          open={selectedItems.length > 0}
          text={`${selectedItems.length}個のアイテム`}
          actions={[
            <IconButton
              tooltip="移動する"
              icon={<FolderIcon />}
              onClick={this.handleSelectedItemsMove}
            />,
            <IconButton
              tooltip={isSelectedItemsAllFavorite ? "スターをはずす" : "スターを付ける"}
              icon={<StarIcon />}
              onClick={this.handleSelectedItemsStar}
            />,
            <IconButton
              tooltip="削除する"
              icon={<TrashIcon />}
              onClick={this.handleSelectedItemsDelete}
            />
          ]}
        />
      </div>
    );
  }
}

export default connect(
  state => ({
    settings: state.settings,
    boards: state.boards,
    items: state.items
  })
)(BoardDetail);
