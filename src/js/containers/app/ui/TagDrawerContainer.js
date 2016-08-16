import React, { Component, PropTypes } from "react";
import { connect } from "react-redux";
import * as TagActions from "../../../actions/tags";
import { getTagEntities } from "../../../selectors/tags";
import bem from "../../../helpers/bem";
import bindHandlers from "../../../helpers/bind-handlers";
import {
  Drawer,
  List,
  ListItem,
  TextField,
  ProcessingOverlay
} from "../../../components/ui/";

const b = bem("tag-drawer");

export class TagDrawerContainer extends Component {
  static propTypes = {
    dispatch: PropTypes.func,
    tags: PropTypes.object,
    tagEntities: PropTypes.array
  };

  constructor(props, context) {
    super(props, context);

    this.state = {
      addTagName: ""
    };

    bindHandlers([
      "handleAddTagChange",
      "handleAddTagEnter",
      "handleTagUpdate",
      "handleTagDelete"
    ], this);
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

  renderTagItem() {
    const { tagEntities } = this.props;

    return tagEntities.map(entity =>
      <ListItem
        key={entity.id}
        value={entity.id}
        processing={entity.isDeleting || entity.isUpdating}
        text={entity.name}
        editable={true}
        onComplete={this.handleTagUpdate}
        onRequestDelete={this.handleTagDelete}
      />
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
        <List>
          {this.renderTagItem()}
        </List>
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
