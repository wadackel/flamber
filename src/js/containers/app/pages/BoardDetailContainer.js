/* eslint-disable */
import _ from "lodash";
import autoBind from "auto-bind";
import React, { Component, PropTypes } from "react";
import { connect } from "react-redux";
import bem from "../../../helpers/bem";
import * as BoardActions from "../../../actions/boards";
import { getCurrentBoard } from "../../../selectors/boards";
import { ItemsContainer } from "../ui/";

const b = bem("board-detail-page");

export class BoardDetailContainer extends Component {
  static propTypes = {
  };

  static defaultProps = {
  };

  componentDidMount() {
    this.props.dispatch(BoardActions.setCurrentBoard(this.props.params.id));
  }

  componentWillReceiveProps(nextProps) {
    const { params } = this.props;

    if (params.id !== nextProps.params.id) {
      this.props.dispatch(BoardActions.setCurrentBoard(nextProps.params.id));
    }
  }

  render() {
    return <ItemsContainer />;
  }
}

export default connect(
  state => ({
    currentBoard: getCurrentBoard(state)
  }),
  null,
  null,
  { pure: false }
)(BoardDetailContainer);
