/* eslint-disable */
import React, { Component, PropTypes } from "react";
import { connect } from "react-redux";
import { fetchBoardsRequest } from "../../actions/boards";

export class Boards extends Component {
  static propTypes = {
    children: PropTypes.node
  };

  static defaultProps = {
  };

  componentDidMount() {
    this.props.dispatch(fetchBoardsRequest());
  }

  render() {
    return (
      <div>
        TODO: Boards
      </div>
    );
  }
}

export default connect(
  state => ({
    boards: state.boards
  })
)(Boards);
