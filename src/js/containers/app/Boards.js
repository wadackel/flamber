/* eslint-disable */
import React, { Component, PropTypes } from "react";
import { connect } from "react-redux";
import { TransitionMotion, spring, presets } from "react-motion";
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
      "handleDelete",
      "handleWillLeave",
      "handleWillEnter"
    ], this);
  }

  componentDidMount() {
    this.props.dispatch(fetchBoardsRequest());
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

    const motionStyles = boards.entities.map(board => ({
      key: board.id,
      style: {
        opacity: spring(1)
      },
      data: board
    }));

    return (
      <TransitionMotion
        styles={motionStyles}
        willLeave={this.handleWillLeave}
        willEnter={this.handleWillEnter}
      >
        {styles =>
          <div className="container boards">
            {styles.map(({ key, style, data }) =>
              <div
                className={b("item", { [boardsLayout]: true })}
                key={key}
                style={style}
              >
                <BoardCard
                  id={data.id}
                  title={data.name}
                  layout={boardsLayout}
                  lastModified={new Date(data.modified)}
                  onDelete={this.handleDelete}
                />
              </div>
            )}
          </div>
        }
      </TransitionMotion>
    );
  }
}

export default connect(
  state => ({
    settings: state.settings,
    boards: state.boards
  })
)(Boards);
