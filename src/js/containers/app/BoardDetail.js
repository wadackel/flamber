/* eslint-disable */
import _ from "lodash";
import React, { Component, PropTypes } from "react";
import { connect } from "react-redux";
import {
  detailBoardRequest,
  deleteItemRequest
} from "../../actions/boards";
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
    const { params: { id } } = this.props;
    this.props.dispatch(detailBoardRequest(id));
  }

  handleDelete(id) {
    this.props.dispatch(deleteItemRequest(id));
  }

  render() {
    const { boards } = this.props;
    const board = _.find(boards.entities, o => o.id === this.props.params.id);

    if (!board) return null;

    const { items } = board;

    return (
      <div className={`container ${b()}`}>
        {items.map(item =>
          <div key={item.id} className={b("item")}>
            <ItemCard
              id={item.id}
              layout={"grid"}
              title={item.name}
              url={item.url}
              image={item.thumbnail}
              imageWidth={item.imageWidth}
              imageHeight={item.imageHeight}
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
    boards: state.boards
  })
)(BoardDetail);
