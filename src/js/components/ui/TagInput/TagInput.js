import autoBind from "auto-bind";
import keycode from "keycode";
import React, { Component, PropTypes } from "react";
import * as OriginalPropTypes from "../../../constants/prop-types";
import bem from "../../../helpers/bem";
import mergeClassNames from "../../../helpers/merge-class-names";
import {
  AutoComplete,
  Chip
} from "../";

const b = bem("tag-input");

export default class TagInput extends Component {
  static propTypes = {
    className: PropTypes.string,
    tags: PropTypes.arrayOf(PropTypes.shape({
      lable: PropTypes.string,
      value: PropTypes.any
    })),
    origin: OriginalPropTypes.origin,
    triggerOrigin: OriginalPropTypes.origin,
    id: PropTypes.string,
    openOnFocus: PropTypes.bool,
    dataSource: PropTypes.array,
    maxSearchResults: PropTypes.number,
    filter: PropTypes.func,
    label: PropTypes.string,
    placeholder: PropTypes.string,
    name: PropTypes.string,
    menuCloseDelay: PropTypes.number,
    onAddTag: PropTypes.func,
    onRemoveTag: PropTypes.func,
    onFocus: PropTypes.func,
    onBlur: PropTypes.func,
    onKeyDown: PropTypes.func,
    onKeyPress: PropTypes.func,
    onKeyUp: PropTypes.func
  };

  static defaultProps = {
    tags: [],
    openOnFocus: true,
    onAddTag: () => {},
    onRemoveTag: () => {}
  };

  constructor(props, context) {
    super(props, context);

    this.chipFocusIndex = -1;
    this.state = {
      searchText: "",
      focused: false
    };

    autoBind(this);
  }

  handleClick() {
    this.refs.control.focus();
  }

  handleChange(value) {
    this.setState({ searchText: value });
  }

  handleInputFocus(e) {
    this.setState({ focused: true });

    if (this.props.onFocus) {
      this.props.onFocus(e);
    }
  }

  handleInputBlur(e) {
    this.setState({ focused: false });

    if (this.props.onBlur) {
      this.props.onBlur(e);
    }
  }

  handleInputKeyDown(e) {
    const { tags } = this.props;
    const value = e.target.value;
    const key = keycode(e);

    switch (key) {
      case "backspace":
        if (value === "" && tags.length > 0) {
          this.requestRemoveTag(tags[tags.length - 1].value);
        }
        break;

      case "left":
        this.moveChipFocus(this.props.tags.length - 1);
        break;

      case "right":
        this.moveChipFocus(0);
        break;
    }
  }

  handleChipKeyDown(e) {
    const key = keycode(e);

    switch (key) {
      case "left":
        this.moveChipFocus(this.chipFocusIndex - 1);
        break;

      case "right":
        this.moveChipFocus(this.chipFocusIndex + 1);
        break;

      case "backspace":
        this.moveChipFocus(this.chipFocusIndex + 1);
        break;
    }
  }

  handleChipFocus(e, value) {
    let index = -1;

    this.props.tags.forEach((tag, i) => {
      if (tag.value === value) {
        index = i;
      }
    });

    if (index > -1) {
      this.chipFocusIndex = index;
    }
  }

  handleNewRequest(value, index) {
    if (index > -1) {
      const tag = this.findTagByValue(value);

      if (tag) {
        this.setState({ searchText: "" });
        this.props.onAddTag(tag);
      }
    }
  }

  handleRequestDelete(value) {
    this.requestRemoveTag(value);
  }

  findTagByValue(value) {
    return this.props.dataSource.filter(o => o.value === value).shift();
  }

  requestRemoveTag(value) {
    const tag = this.findTagByValue(value);

    if (tag) {
      this.props.onRemoveTag(tag);
    }
  }

  handleTagClick(e) {
    e.stopPropagation();
  }

  moveChipFocus(index) {
    const maxIndex = this.props.tags.length - 1;
    let finalIndex = index;

    if (index < 0 || index > maxIndex) {
      this.refs.control.focus();
      finalIndex = -1;

    } else {
      const tag = this.props.tags[index];

      if (tag) {
        const chip = this.getChipByValue(tag.value);
        if (chip) chip.focus();
      }
    }

    this.chipFocusIndex = finalIndex;
  }

  getChipByValue(value) {
    return this.refs[`chip-${value}`];
  }

  renderTags() {
    return this.props.tags.map(tag =>
      <Chip
        key={tag.value}
        ref={`chip-${tag.value}`}
        className={b("tag")()}
        value={tag.value}
        onRequestDelete={this.handleRequestDelete}
        onClick={this.handleTagClick}
        onKeyDown={this.handleChipKeyDown}
        onFocus={this.handleChipFocus}
      >
        {tag.label}
      </Chip>
    );
  }

  render() {
    const {
      className,
      tags,
      dataSource, // eslint-disable-line no-unused-vars
      onFocus, // eslint-disable-line no-unused-vars
      onBlur, // eslint-disable-line no-unused-vars
      onKeyDown, // eslint-disable-line no-unused-vars
      ...props
    } = this.props;

    const {
      searchText,
      focused
    } = this.state;

    const modifier = {
      focused
    };

    const filteredDataSource = dataSource.filter(tag =>
      !tags.some(o => o.value === tag.value)
    );

    return (
      <div
        className={mergeClassNames(b(modifier)(), className)}
        onClick={this.handleClick}
      >
        {this.renderTags()}

        <AutoComplete
          ref="control"
          className={b("control")()}
          searchText={searchText}
          dataSource={filteredDataSource}
          dataSourceConfig={{
            text: "label",
            value: "value"
          }}
          onFocus={this.handleInputFocus}
          onBlur={this.handleInputBlur}
          onKeyDown={this.handleInputKeyDown}
          onNewRequest={this.handleNewRequest}
          onUpdateInput={this.handleChange}
          {...props}
        />
      </div>
    );
  }
}
