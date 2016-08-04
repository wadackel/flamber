/* eslint-disable */
import React, { Component, PropTypes } from "react";
import { connect } from "react-redux";
import { push } from "react-router-redux";
import * as Layout from "../../constants/layouts";
import * as BoardActions from "../../actions/boards";
import * as ItemActions from "../../actions/items";
import { getCurrentBoard } from "../../selectors/boards";
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
    ], this);
  }

  componentDidMount() {
    this.props.dispatch(BoardActions.setCurrentBoard(this.props.params.id));
  }

  render() {
    const {
      boards,
      items,
      itemEntities,
      settings: {
        itemsLayout,
        itemsSize
      }
    } = this.props;

    console.log(this.props);

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
      </div>
    );
  }
}

export default connect(
  (state, ownProps) => {
    const currentBoard = getCurrentBoard(state);
    return {
      settings: state.settings,
      boards: state.boards,
      items: state.items,
      itemEntities: !currentBoard ? [] : currentBoard.items.map(id => state.entities.items[id]),
      currentBoard
    };
  },
  null,
  null,
  { pure: false }
)(BoardDetailContainer);
