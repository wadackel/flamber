/* eslint-disable */
import React, { Component, PropTypes } from "react";
import { connect } from "react-redux";
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

    // TODO: Fetch id
  }

  render() {
    return (
      <div className={`container ${b()}`}>
        TODO: BoardDetail
      </div>
    );
  }
}

export default connect(
  state => ({
    settings: state.settings
  })
)(BoardDetail);
