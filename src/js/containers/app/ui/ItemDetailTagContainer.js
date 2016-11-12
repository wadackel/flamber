// @flow
import autoBind from "auto-bind";
import React, { Component } from "react";
import { connect } from "react-redux";
import * as ItemActions from "../../../actions/items";
import bem from "../../../helpers/bem";
import { getCurrentItem } from "../../../selectors/items";
import { getTagEntities, getTagEntitiesByItemId } from "../../../selectors/tags";
import {
  TagInput
} from "../../../components/ui/";

import type { Dispatch } from "redux";
import type { ConnectState } from "../../../types/redux";
import type { ItemEntity } from "../../../types/item";
import type { TagId, TagEntities } from "../../../types/tag";


const b = bem("item-detail-tag-container");

type Props = {
  dispatch: Dispatch;
  currentItem: ?ItemEntity;
  currentItemTagEntities: ?TagEntities;
  tagEntities: TagEntities;
};

type TagValue = {
  label: string;
  value: TagId;
};

export class ItemDetailTagContainer extends Component {
  props: Props;

  constructor(props: Props, context: Object) {
    super(props, context);
    autoBind(this);
  }

  handleAddTag(tag: TagValue) {
    const { dispatch, currentItem } = this.props;
    if (currentItem) {
      dispatch(ItemActions.addItemTagIfNeeded(currentItem.id, tag.value));
    }
  }

  handleNewTag(label: string) {
    const { dispatch, currentItem } = this.props;
    if (currentItem) {
      dispatch(ItemActions.registerItemTagRequest(currentItem.id, label));
    }
  }

  handleRemoveTag(tag: TagValue) {
    const { dispatch, currentItem } = this.props;
    if (currentItem) {
      dispatch(ItemActions.removeItemTagRequest(currentItem.id, tag.value));
    }
  }

  render() {
    const {
      currentItem,
      currentItemTagEntities,
      tagEntities
    } = this.props;

    if (!currentItem || !currentItemTagEntities) return null;

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
  (state: ConnectState) => {
    const currentItem = getCurrentItem(state);

    return {
      currentItemTagEntities: getTagEntitiesByItemId(state, currentItem ? currentItem.id : ""),
      tagEntities: getTagEntities(state),
      currentItem
    };
  }
)(ItemDetailTagContainer);
