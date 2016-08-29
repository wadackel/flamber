/* eslint-disable */
import autoBind from "auto-bind";
import React, { Component, PropTypes } from "react";
import { connect } from "react-redux";
import * as ItemActions from "../../../actions/items";
import bem from "../../../helpers/bem";
import { getCurrentItem } from "../../../selectors/items";
import {
  AutoComplete
} from "../../../components/ui/";
import {
  PencilIcon
} from "../../../components/svg-icons/";

const b = bem("item-detail-tag-container");

export class ItemDetailTagContainer extends Component {
  static propTypes = {
  };

  static defaultProps = {
  };

  constructor(props, context) {
    super(props, context);

    autoBind(this);
  }

  render() {
    const { currentItem } = this.props;

    if (!currentItem) return null;

    return (
      <div className={b()}>
        TODO
      </div>
    );
  }
}

export default connect(
  state => ({
    currentItem: getCurrentItem(state)
  }),
  null,
  null,
  { pure: false }
)(ItemDetailTagContainer);
