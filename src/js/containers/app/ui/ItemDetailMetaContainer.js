/* eslint-disable */
import isURL from "validator/lib/isURL";
import React, { Component, PropTypes } from "react";
import { connect } from "react-redux";
import palette from "../../../constants/palette";
import * as ItemActions from "../../../actions/items";
import bem from "../../../helpers/bem";
import { getCurrentItem } from "../../../selectors/items";
import {
  TextField,
  CancelableEditText
} from "../../../components/ui/";
import {
  PencilIcon
} from "../../../components/svg-icons/";

const b = bem("item-detail-meta-container");

export class ItemDetailPaletteContainer extends Component {
  handleItemNameComplete = (value) => {
    const { dispatch, currentItem } = this.props;
    dispatch(ItemActions.updateItemNameIfNeeded(currentItem.id, value));
  }

  handleItemDescriptionComplete = (value) => {
    const { dispatch, currentItem } = this.props;
    dispatch(ItemActions.updateItemDescriptionRequest(currentItem.id, value));
  }

  renderURL() {
    const { currentItem: { url } } = this.props;

    return isURL(url, { require_protocol: true }) // eslint-disable-line camelcase
      ? <a href={url} target="_blank">{url}</a>
      : <span>{url}</span>;
  }

  render() {
    const { currentItem } = this.props;

    if (!currentItem) return null;

    return (
      <div className={b()}>
        <div className={b("header")()}>
          <CancelableEditText
            multiLine
            className={b("name")()}
            icon={<PencilIcon />}
            value={currentItem.name}
            onComplete={this.handleItemNameComplete}
          />
          <div className={b("url")()}>
            {this.renderURL()}
          </div>
        </div>
        <CancelableEditText
          multiLine
          className={b("description")()}
          icon={<PencilIcon />}
          placeholder="概要を編集"
          value={currentItem.description}
          onComplete={this.handleItemDescriptionComplete}
        />
      </div>
    );
  }
}

export default connect(
  state => ({
    currentItem: getCurrentItem(state)
  })
)(ItemDetailPaletteContainer);
