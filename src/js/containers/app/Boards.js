/* eslint-disable */
import React, { Component, PropTypes } from "react";
import { connect } from "react-redux";
import { fetchBoardsRequest } from "../../actions/boards";
import { BoardCard } from "../../components/ui/";

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
      boards
    } = this.props;

    const boardElements = boards.entities.map(board =>
      <BoardCard
        key={board.id}
        style={{ width: 300 }}
        title={board.name}
        lastModified={new Date(board.modified)}
      />
    );

    return (
      <div>
        {boardElements}
      </div>
    );
  }
}

export default connect(
  state => ({
    boards: state.boards
  })
)(Boards);
