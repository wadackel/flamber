/* eslint-disable */
import _ from "lodash";
import autoBind from "auto-bind";
import React, { Component, PropTypes } from "react";
import { connect } from "react-redux";
import * as ItemActions from "../../../actions/items";
import bem from "../../../helpers/bem";
import { getCurrentItem } from "../../../selectors/items";
import { getTagEntities, getTagEntitiesByItemId } from "../../../selectors/tags";
import {
  TagInput
} from "../../../components/ui/";

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

  handleAddTag(tag) {
    const { dispatch, currentItem } = this.props;
    dispatch(ItemActions.addItemTagIfNeeded(currentItem.id, tag.value));
  }

  handleNewTag(label) {
    const { dispatch, currentItem } = this.props;
    dispatch(ItemActions.registerItemTagRequest(currentItem.id, label));
  }

  handleRemoveTag(tag) {
    const { dispatch, currentItem } = this.props;
    dispatch(ItemActions.removeItemTagRequest(currentItem.id, tag.value));
  }

  render() {
    const {
      currentItem,
      currentItemTagEntities,
      tagEntities
    } = this.props;

    if (!currentItem) return null;

    const tags = currentItemTagEntities.map(entity => ({
      label: entity.name,
      value: entity.id
    }));

    const tagSource = tagEntities
      .map(entity => ({
        label: entity.name,
        value: entity.id
      }));

    return (
      <div className={b()}>
        <TagInput
          placeholder="Type tag name"
          tags={tags}
          dataSource={tagSource}
          onAddTag={this.handleAddTag}
          onNewTag={this.handleNewTag}
          onRemoveTag={this.handleRemoveTag}
        />
      </div>
    );
  }
}

export default connect(
  state => {
    const currentItem = getCurrentItem(state);

    return {
      currentItemTagEntities: getTagEntitiesByItemId(state, currentItem ? currentItem.id : ""),
      tagEntities: getTagEntities(state),
      currentItem
    };
  },
  null,
  null,
  { pure: false }
)(ItemDetailTagContainer);
