import React, { Component, PropTypes } from "react";
import { connect } from "react-redux";
import { signInRequest } from "../actions/auth";

class SignInContainer extends Component {
  static propTypes = {
    dispatch: PropTypes.func,
    auth: PropTypes.object
  };

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
}))(SignInContainer);
