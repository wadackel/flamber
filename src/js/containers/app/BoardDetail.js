/* eslint-disable */
import React, { Component, PropTypes } from "react";
import { connect } from "react-redux";
import {
  deleteItemRequest,
  currentBoard
} from "../../actions/boards";
import { boardSelectorByBoards } from "../../selectors/boards";
import bem from "../../helpers/bem";
import bindHandlers from "../../helpers/bind-handlers";
import {
  ItemCard
} from "../../components/ui/";

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
    const { items } = this.props;

    return (
      <div className={`container ${b()}`}>
        {items.entities.map(item =>
          <div key={item.id} className={b("item")}>
            <ItemCard
              id={item._id}
              layout={"grid"}
              title={item.name}
              image={item.thumbnail}
              imageWidth={item.width}
              imageHeight={item.height}
              onDelete={this.handleDelete}
            />
          </div>
        )}
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
