/* eslint-disable */
import React, { Component, PropTypes } from "react";
import { connect } from "react-redux";
import * as Layout from "../../constants/layouts";
import { currentBoard } from "../../actions/boards";
import {
  selectItemToggle,
  favoriteItemToggleRequest,
  deleteItemRequest
} from "../../actions/items";
import { getBoardByIdFromBoards } from "../../selectors/boards";
import bem from "../../helpers/bem";
import bindHandlers from "../../helpers/bind-handlers";
import { CardGroup, ItemCard } from "../../components/ui/";

const b = bem("board-detail");

export class BoardDetail extends Component {
  static propTypes = {
  };

  static defaultProps = {
  };

  constructor(props, context) {
    super(props, context);

    bindHandlers([
      "handleSelect",
      "handleFavorite",
      "handleDelete"
    ], this);
  }

  componentDidMount() {
    this.props.dispatch(currentBoard(this.props.params.id));
  }

  handleSelect(id) {
    this.props.dispatch(selectItemToggle(id));
  }

  handleFavorite(id) {
    this.props.dispatch(favoriteItemToggleRequest(id));
  }

  handleDelete(id) {
    this.props.dispatch(deleteItemRequest(id));
  }

  render() {
    const {
      items,
      settings: {
        itemsLayout,
        itemsSize
      }
    } = this.props;

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
              onDelete={this.handleDelete}
            />
          )}
        </CardGroup>
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
