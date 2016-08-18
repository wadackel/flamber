import React, { Component, PropTypes } from "react";
import { connect } from "react-redux";
import bem from "../../../helpers/bem";
import * as ItemActions from "../../../actions/items";
import { ItemsContainer } from "../ui/";

const b = bem("all-items-page");

export class AllItemsPage extends Component {
  static propTypes = {
    dispatch: PropTypes.func
  };

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
  () => ({}),
  null,
  null,
  { pure: false }
)(AllItemsPage);
