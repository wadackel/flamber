import React, { Component } from "react";
import { connect } from "react-redux";
import { signOutRequest } from "../actions/auth";

class SignOut extends Component {
  componentDidMount() {
    if (!this.props.auth.isFetching) {
      this.props.dispatch(signOutRequest());
    }
  }

  render() {
    return null;
  }
}

export default connect(state => ({
  auth: state.auth
}))(SignOut);
