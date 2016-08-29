/* eslint-disable */
import autoBind from "auto-bind";
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
  static propTypes = {
  };

  static defaultProps = {
  };

  constructor(props, context) {
    super(props, context);

    this.state = {};

    autoBind(this);
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
          />
          <div className={b("url")()}>
            {this.renderURL()}
          </div>
        </div>
        <TextField
          multiLine
          className={b("description")()}
          placeholder="概要を編集"
          minRows={5}
        />
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
)(ItemDetailPaletteContainer);
