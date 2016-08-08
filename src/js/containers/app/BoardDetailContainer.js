/* eslint-disable */
import React, { Component, PropTypes } from "react";
import { connect } from "react-redux";
import { push } from "react-router-redux";
import * as Layout from "../../constants/layouts";
import * as BoardActions from "../../actions/boards";
import * as ItemActions from "../../actions/items";
import { getCurrentBoard } from "../../selectors/boards";
import {
  getItemEntitiesByBoardId,
  getSelectedItemEntities
} from "../../selectors/items";
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

export class BoardDetailContainer extends Component {
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
      "handleSelectDelete",
      "handleSelectFavorite"
    ], this);
  }

  componentDidMount() {
    this.props.dispatch(BoardActions.setCurrentBoard(this.props.params.id));
  }

  handleSelect(id) {
    this.props.dispatch(ItemActions.selectItemToggle(id));
  }

  handleFavorite(id) {
    this.props.dispatch(ItemActions.favoriteItemToggleRequest(id));
  }

  handleMove(id) {
    // this.setState({
    //   moveItem: getItemByIdFromItems(this.props.items, id),
    //   selectBoardDialogOpen: true,
    //   moveItemSnackbarOpen: false
    // });
  }

  handleDelete(id) {
    this.props.dispatch(ItemActions.deleteItemRequest(id));
  }

  handleSelectDelete() {
    this.props.dispatch(ItemActions.selectedItemsDeleteRequest());
  }

  handleSelectFavorite() {
    const { dispatch, selectedItemEntities } = this.props;
    const isAllFavorite = this.isAllFavoriteByItemEntities(selectedItemEntities);
    dispatch(ItemActions.selectedItemsFavoriteRequest(!isAllFavorite));
  }

  isAllFavoriteByItemEntities(entities) {
    return entities.every(entity => entity.favorite);
  }

  render() {
    const {
      boards,
      items,
      itemEntities,
      selectedItemEntities,
      settings: {
        itemsLayout,
        itemsSize
      }
    } = this.props;

    const hasSelectedItems = selectedItemEntities.length > 0;
    const isAllFavorite = this.isAllFavoriteByItemEntities(selectedItemEntities);

    return (
      <div className={`container ${b()}`}>
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

        <ToolBox
          open={hasSelectedItems}
          text={`${selectedItemEntities.length}個のアイテム`}
          actions={[
            <IconButton
              tooltip={isAllFavorite ? "スターを外す" : "スターを付ける"}
              icon={<StarIcon />}
              onClick={this.handleSelectFavorite}
            />,
            <IconButton
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

export default connect(
  (state, ownProps) => {
    const currentBoard = getCurrentBoard(state);
    const currentBoardId = (currentBoard && currentBoard.id) || "";

    return {
      settings: state.settings,
      boards: state.boards,
      items: state.items,
      itemEntities: getItemEntitiesByBoardId(state, currentBoardId),
      selectedItemEntities: getSelectedItemEntities(state),
      currentBoard
    };
  },
  null,
  null,
  { pure: false }
)(BoardDetailContainer);
