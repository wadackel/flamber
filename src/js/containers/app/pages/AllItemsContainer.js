/* eslint-disable */
import autoBind from "auto-bind";
import React, { Component, PropTypes } from "react";
import { connect } from "react-redux";
import bem from "../../../helpers/bem";
import * as ItemActions from "../../../actions/items";
import { ItemsContainer } from "../ui/";

const b = bem("all-items-page");

export class AllItemsContainer extends Component {
  static propTypes = {
  };

  constructor(props, context) {
    super(props, context);
    autoBind(this);
  }

  componentDidMount() {
    this.props.dispatch(ItemActions.fetchItemsRequest());
  }

  render() {
    return (
      <div className={b()}>
        <ItemsContainer />
      </div>
    );
  }
}

export default connect(
  state => state,
  null,
  null,
  { pure: false }
)(AllItemsContainer);
