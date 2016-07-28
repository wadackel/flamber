/* eslint-disable */
import React, { Component, PropTypes } from "react";
import { connect } from "react-redux";
import * as Layout from "../../constants/layouts";
import { currentBoard } from "../../actions/boards";
import { deleteItemRequest } from "../../actions/items";
import { boardSelectorByBoards } from "../../selectors/boards";
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
      "handleDelete"
    ], this);
  }

  componentDidMount() {
    this.props.dispatch(currentBoard(this.props.params.id));
  }

  handleDelete(id) {
    this.props.dispatch(deleteItemRequest(id));
  }

  render() {
    const { items, settings: { itemsLayout } } = this.props;

    return (
      <div className={`container ${b()}`}>
        <CardGroup
          columnWidth={260}
          layout={itemsLayout}
        >
          {items.entities.map(item =>
            <ItemCard
              key={item._id}
              id={item._id}
              layout={itemsLayout}
              title={item.name}
              image={item.thumbnail}
              imageWidth={item.width}
              imageHeight={item.height}
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
