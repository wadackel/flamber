/* eslint-disable */
import React, { Component, PropTypes } from "react";
import { connect } from "react-redux";
import { push } from "react-router-redux";
import bem from "../../helpers/bem";
import bindHandlers from "../../helpers/bind-handlers";
import { fetchBoardsRequest, deleteBoardRequest } from "../../actions/boards";
import { CardGroup, BoardCard } from "../../components/ui/";

const b = bem("boards");

export class BoardsContainer extends Component {
  static propTypes = {
  };

  static defaultProps = {
  };

  constructor(props, context) {
    super(props, context);

    bindHandlers([
      "handleEdit",
      "handleDelete",
      "handleWillLeave",
      "handleWillEnter"
    ], this);
  }

  componentDidMount() {
    this.props.dispatch(fetchBoardsRequest());
  }

  handleEdit(id) {
    this.props.dispatch(push(`/app/board/${id}`));
  }

  handleDelete(id) {
    this.props.dispatch(deleteBoardRequest(id));
  }

  handleWillEnter() {
    return {
      opacity: 0
    };
  }

  handleWillLeave() {
    return {
      opacity: spring(0)
    };
  }

  render() {
    const {
      settings: {
        boardsLayout
      },
      boards
    } = this.props;

    return (
      <div className={`container ${b()}`}>
        <CardGroup
          columnWidth={300}
          gutter={30}
          layout={boardsLayout}
        >
          {boards.entities.map(board =>
            <BoardCard
              key={board._id}
              id={board._id}
              title={board.name}
              image={board.firstItem ? board.firstItem.thumbnail : "/TODO.png"}
              layout={boardsLayout}
              itemCount={board.itemCount}
              lastModified={new Date(board.modified)}
              onEdit={this.handleEdit}
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
    boards: state.boards
  })
)(BoardsContainer);
