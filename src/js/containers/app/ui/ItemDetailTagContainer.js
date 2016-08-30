/* eslint-disable */
import autoBind from "auto-bind";
import React, { Component, PropTypes } from "react";
import { connect } from "react-redux";
import * as ItemActions from "../../../actions/items";
import bem from "../../../helpers/bem";
import { getCurrentItem } from "../../../selectors/items";
import { getTagEntities, getTagEntitiesByItemId } from "../../../selectors/tags";
import {
  AutoComplete,
  TagList
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

  handleAddTag(value) {
    const { dispatch, currentItem } = this.props;
    dispatch(ItemActions.addItemTagRequest(currentItem.id, value));
  }

  handleTagDelete(value) {
    const { dispatch, currentItem } = this.props;
    dispatch(ItemActions.removeItemTagRequest(currentItem.id, value));
  }

  render() {
    const {
      currentItem,
      currentItemTagEntities,
      tagEntities
    } = this.props;

    if (!currentItem) return null;

    const tagSource = tagEntities.map(entity => ({
      text: entity.name,
      value: entity.id
    }));

    const tags = currentItemTagEntities.map(entity => ({
      label: entity.name,
      value: entity.id
    }));

    return (
      <div className={b()}>
        <AutoComplete
          openOnFocus
          className={b("control")()}
          label="Type tag name"
          placeholder="タグの名前を入力"
          dataSource={tagSource}
          onNewRequest={this.handleAddTag}
        />

        <TagList
          className={b("tags")()}
          tags={tags}
          onItemDelete={this.handleTagDelete}
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
