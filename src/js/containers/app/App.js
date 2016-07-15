/* eslint-disable */
import React, { Component, PropTypes } from "react";
import { connect } from "react-redux";
import { push } from "react-router-redux";
import bem from "../../helpers/bem";
import bindHandlers from "../../helpers/bind-handlers";
import {
  Header,
  NavItem
} from "../../components/ui/";

const b = bem("app");

export class App extends Component {
  static propTypes = {
    children: PropTypes.node
  };

  static defaultProps = {
  };

  constructor(props) {
    super(props);

    bindHandlers([
      "handleMyItemsClick",
      "handleFeedsClick",
      "handleSettingsClick"
    ], this);
  }

  handleMyItemsClick() {
    this.props.dispatch(push("/app/boards"));
  }

  handleFeedsClick() {
    this.props.dispatch(push("/app/feeds"));
  }

  handleSettingsClick() {
    this.props.dispatch(push("/app/settings"));
  }

  render() {
    return (
      <div className={b()}>
        <Header
          navItems={[
            <NavItem onClick={this.handleMyItemsClick}>My Items</NavItem>,
            <NavItem onClick={this.handleFeedsClick}>Feeds</NavItem>
          ]}
          onSettingsClick={this.handleSettingsClick}
        />
        <div className={b("content")}>
          {this.props.children}
        </div>
      </div>
    );
  }
}

export default connect(
  state => ({ auth: state.auth })
)(App);
