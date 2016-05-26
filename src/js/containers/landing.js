import React, { Component } from "react";
import { connect } from "react-redux";

class Landing extends Component {
  render() {
    return (
      <div>
        <a href="#">Login</a>
      </div>
    );
  }
}

export default connect(state => state)(Landing);
