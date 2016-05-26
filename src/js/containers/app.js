import React, { Component } from "react";
import { connect } from "react-redux";

class App extends Component {
  render() {
    return (
      <div>
        <h1>dripup</h1>
        {this.props.children}
      </div>
    );
  }
}

export default connect(state => state)(App);
