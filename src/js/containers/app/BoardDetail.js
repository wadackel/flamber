/* eslint-disable */
import React, { Component, PropTypes } from "react";
import { connect } from "react-redux";
import { detailBoardRequest } from "../../actions/boards";
import bem from "../../helpers/bem";
import bindHandlers from "../../helpers/bind-handlers";

const b = bem("board-detail");

export class BoardDetail extends Component {
  static propTypes = {
  };

  static defaultProps = {
  };

  constructor(props, context) {
    super(props, context);

    bindHandlers([
    ], this);
  }

  componentDidMount() {
    const { params: { id } } = this.props;
    this.props.dispatch(detailBoardRequest(id));
  }

  render() {
    const { boards: { board } } = this.props;

    return (
      <div className={`container ${b()}`}>
        <pre>
        {JSON.stringify(board || "{}", null, "  ")}
        </pre>
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
