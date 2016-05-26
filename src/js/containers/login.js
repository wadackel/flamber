import React, { Component } from "react";
import { connect } from "react-redux";

class Login extends Component {
  render() {
    return (
      <div>Login</div>
    );
  }
}

export default connect(state => state)(Login);
