import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router";

class Landing extends Component {
  render() {
    return (
      <div>
        <Link to="/login">Login</Link>
      </div>
    );
  }
}

export default connect(state => state)(Landing);
