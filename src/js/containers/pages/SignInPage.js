/* eslint-disable */
import React, { Component, PropTypes } from "react";
import { connect } from "react-redux";
import * as AuthProviders from "../../constants/auth-providers";
import { signInRequest } from "../../actions/auth";

class SignInPage extends Component {
  static propTypes = {
    dispatch: PropTypes.func,
    auth: PropTypes.object
  };

  handleSignInClick(e) {
    e.preventDefault();
    this.props.dispatch(signInRequest(AuthProviders.GOOGLE));
  }

  render() {
    return (
      <div>
        <h1>Login</h1>
        <button onClick={::this.handleSignInClick}>Googleでログイン</button>
      </div>
    );
  }
}

export default connect(state => ({
  auth: state.auth
}))(SignInPage);
