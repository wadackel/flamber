import React, { Component } from "react";
import { connect } from "react-redux";
import { signInRequest } from "../actions/auth";

class SignIn extends Component {
  handleSignInClick(e) {
    e.preventDefault();
    const { authenticateURL } = this.props.auth;
    this.props.dispatch(signInRequest(authenticateURL));
  }

  render() {
    return (
      <div>
        <h1>Login</h1>
        <button onClick={::this.handleSignInClick}>Visit Google</button>
      </div>
    );
  }
}

export default connect(state => ({
  auth: state.auth
}))(SignIn);
