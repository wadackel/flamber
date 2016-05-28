import React, { Component } from "react";
import { connect } from "react-redux";
import { logoutRequest } from "../actions/auth";

class Logout extends Component {
  componentDidMount() {
    if (!this.props.auth.isFetching) {
      this.props.dispatch(logoutRequest());
    }
  }

  render() {
    return null;
  }
}

export default connect(state => ({
  auth: state.auth
}))(Logout);
