import autoBind from "auto-bind";
import React, { Component, PropTypes } from "react";
import { push } from "react-router-redux";
import { connect } from "react-redux";
import * as TagActions from "../../../actions/tags";
import { getTagEntities } from "../../../selectors/tags";
import bem from "../../../helpers/bem";
import {
  Drawer,
  List,
  ListItem,
  EmptyData,
  TextField,
  ProcessingOverlay
} from "../../../components/ui/";
import { TagsIcon } from "../../../components/svg-icons";

const b = bem("tag-drawer-container");

export class TagDrawerContainer extends Component {
  static propTypes = {
    dispatch: PropTypes.func,
    tags: PropTypes.object,
    tagEntities: PropTypes.array
  };

  constructor(props, context) {
    super(props, context);

    this.state = { addTagName: "" };

    autoBind(this);
  }

  handleAddTagChange(e, value) {
    this.setState({ addTagName: value });
  }

  handleAddTagEnter() {
    const { addTag } = this.refs;
    const { addTagName } = this.state;
    const finalAddTagName = addTagName.trim();

    if (finalAddTagName !== "") {
      this.props.dispatch(TagActions.addTagRequest(finalAddTagName));
      this.setState({ addTagName: "" });
      addTag.blur();
    }
  }

  handleTagUpdate(item, text) {
    this.props.dispatch(TagActions.updateTagRequest({
      id: item.props.value,
      name: text
    }));
  }

  handleTagDelete(item) {
    this.props.dispatch(TagActions.deleteTagRequest(item.props.value));
  }

  handleTagClick(item, id) {
    this.props.dispatch(push(`/app/tag/${id}`));
  }

  renderFooter() {
    const { tags } = this.props;
    const { addTagName } = this.state;

    return (
      <div className={b("footer")()}>
        <ProcessingOverlay
          className={b("footer-overlay")()}
          show={tags.isAdding}
          spinnerSize={24}
        />
        <TextField
          ref="addTag"
          className={b("add-tag")()}
          label="Add tag"
          placeholder="Type tag name"
          value={addTagName}
          onChange={this.handleAddTagChange}
          onEnter={this.handleAddTagEnter}
        />
      </div>
    );
  }

  renderEmptyData() {
    return <EmptyData
      className={b("empty-data")()}
      size="sm"
      title="No tags"
      icon={<TagsIcon />}
    >
      タグがありません。<br />
      この下にあるフォームからタグを追加しましょう。
    </EmptyData>;
  }

  renderTagItem() {
    const { tagEntities } = this.props;

    if (tagEntities.length === 0) return this.renderEmptyData();

    return (
      <List>
        {tagEntities.map(entity =>
          <ListItem
            key={entity.id}
            value={entity.id}
            processing={entity.isDeleting || entity.isUpdating}
            text={entity.name}
            editable={true}
            onComplete={this.handleTagUpdate}
            onClick={this.handleTagClick}
            onRequestDelete={this.handleTagDelete}
          />
        )}
      </List>
    );
  }

  render() {
    const { tags } = this.props;

    return (
      <Drawer
        className={b()}
        open={tags.drawerOpen}
        footer={this.renderFooter()}
      >
        {this.renderTagItem()}
      </Drawer>
    );
  }
}

export default connect(
  state => ({
    tags: state.tags,
    tagEntities: getTagEntities(state)
  }),
  null,
  null,
  { pure: false }
)(TagDrawerContainer);
