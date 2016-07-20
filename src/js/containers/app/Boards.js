/* eslint-disable */
import React, { Component, PropTypes } from "react";
import { connect } from "react-redux";
import bem from "../../helpers/bem";
import bindHandlers from "../../helpers/bind-handlers";
import { fetchBoardsRequest, deleteBoardRequest } from "../../actions/boards";
import { BoardCard } from "../../components/ui/";

const b = bem("boards");

export class Boards extends Component {
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
    this.props.dispatch(fetchBoardsRequest());
  }

  handleDelete(id) {
    this.props.dispatch(deleteBoardRequest(id));
  }

  render() {
    const {
      settings: {
        boardsLayout
      },
      boards
    } = this.props;

    const boardElements = boards.entities.map(board =>
      <div
        className={b("item", { [boardsLayout]: true })}
        key={board.id}
      >
        <BoardCard
          id={board.id}
          title={board.name}
          layout={boardsLayout}
          lastModified={new Date(board.modified)}
          onDelete={this.handleDelete}
        />
      </div>
    );

    return (
      <div className="container boards">
        {boardElements}
      </div>
    );
  }
}

export default connect(
  state => ({
    settings: state.settings,
    boards: state.boards
  })
)(Boards);
