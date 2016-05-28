import React, { Component } from "react";
import { connect } from "react-redux";
import { loginRequest } from "../actions/auth";

class Login extends Component {
  handleLoginClick(e) {
    e.preventDefault();
    const { authenticateURL } = this.props.auth;
    this.props.dispatch(loginRequest(authenticateURL));
  }

  render() {
    return (
      <div>
        <h1>Login</h1>
        <button onClick={::this.handleLoginClick}>Visit Google</button>
      </div>
    );
  }
}

export default connect(state => ({
  auth: state.auth
}))(Login);
