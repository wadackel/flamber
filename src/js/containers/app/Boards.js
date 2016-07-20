/* eslint-disable */
import React, { Component, PropTypes } from "react";
import { connect } from "react-redux";
import bem from "../../helpers/bem";
import { fetchBoardsRequest } from "../../actions/boards";
import { BoardCard } from "../../components/ui/";

const b = bem("boards");

export class Boards extends Component {
  static propTypes = {
  };

  static defaultProps = {
  };

  componentDidMount() {
    this.props.dispatch(fetchBoardsRequest());
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
          title={board.name}
          layout={boardsLayout}
          lastModified={new Date(board.modified)}
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
