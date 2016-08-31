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

    this.state = { searchText: "" };

    autoBind(this);
  }

  handleAddTag(value) {
    const { dispatch, currentItem } = this.props;
    dispatch(ItemActions.addItemTagIfNeeded(currentItem.id, value));
    this.setState({ searchText: "" });
  }

  handleUpdateInput(value) {
    this.setState({ searchText: value });
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

    const { searchText } = this.state;

    if (!currentItem) return null;

    const tags = currentItemTagEntities.map(entity => ({
      label: entity.name,
      value: entity.id
    }));

    const tagSource = tagEntities
      .map(entity => ({
        text: entity.name,
        value: entity.id
      }))
      .filter(obj => !_.some(tags, { value: obj.value }));

    return (
      <div className={b()}>
        <AutoComplete
          openOnFocus
          className={b("control")()}
          searchText={searchText}
          label="Type tag name"
          placeholder="タグの名前を入力"
          dataSource={tagSource}
          onNewRequest={this.handleAddTag}
          onUpdateInput={this.handleUpdateInput}
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
