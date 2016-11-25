// @flow
import keycode from "keycode";
import React, { Component } from "react";
import bem from "../../../helpers/bem";
import mergeClassNames from "../../../helpers/merge-class-names";
import {
  AutoComplete,
  Chip
} from "../";
import type { Origin } from "../../../types/prop-types";
import type { DataSource, DataSourceConfig, Filter } from "../AutoComplete/AutoComplete";

type TagValue = {
  label: string;
  value: any;
};

type Props = {
  className?: string;
  id?: string;
  name?: string;
  label?: string;
  placeholder?: string;
  tags: Array<TagValue>;
  origin: Origin;
  triggerOrigin: Origin;
  openOnFocus: boolean;
  dataSource: DataSource;
  dataSourceConfig?: DataSourceConfig;
  filter?: Filter;
  menuCloseDelay?: number;
  onAddTag?: Function;
  onNewTag?: Function;
  onRemoveTag?: Function;
  onFocus?: Function;
  onBlur?: Function;
  onKeyDown?: Function;
  onKeyPress?: Function;
  onKeyUp?: Function;
};

type State = {
  searchText: string;
  focused: boolean;
};

const b = bem("tag-input");

export default class TagInput extends Component {
  props: Props;
  state: State = {
    searchText: "",
    focused: false
  };

  static defaultProps = {
    tags: [],
    openOnFocus: true
  };

  chipFocusIndex: number = -1;

  handleClick = () => {
    this.refs.control.focus();
  }

  handleChange = (value: string) => {
    this.setState({ searchText: value });
  }

  handleInputFocus = (e: SyntheticFocusEvent) => {
    this.setState({ focused: true });

    if (typeof this.props.onFocus === "function") {
      this.props.onFocus(e);
    }
  }

  handleInputBlur = (e: SyntheticFocusEvent) => {
    this.setState({ focused: false });

    if (typeof this.props.onBlur === "function") {
      this.props.onBlur(e);
    }
  }

  handleInputKeyDown = (e: SyntheticKeyboardEvent) => {
    const { tags } = this.props;
    const value = e.target instanceof HTMLInputElement ? e.target.value : "";
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

  handleChipKeyDown = (e: SyntheticKeyboardEvent) => {
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

  handleChipFocus = (e: SyntheticFocusEvent, value: any) => {
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

  handleNewRequest = (value: any, index: number) => {
    if (index > -1) {
      const tag = this.findTagByValue(value);

      if (tag && typeof this.props.onAddTag === "function") {
        this.props.onAddTag(tag);
      }
    } else if (typeof this.props.onNewTag === "function") {
      this.props.onNewTag(value);
    }

    this.setState({ searchText: "" });
  }

  handleDelete = (value: any) => {
    this.requestRemoveTag(value);
  }

  handleTagClick = (e: SyntheticMouseEvent) => {
    e.stopPropagation();
  }

  findTagByValue(value: any) {
    return this.props.dataSource.filter(o => o.value === value).shift();
  }

  requestRemoveTag(value: any) {
    const tag = this.findTagByValue(value);

    if (tag && typeof this.props.onRemoveTag === "function") {
      this.props.onRemoveTag(tag);
    }
  }

  moveChipFocus(index: number): void {
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

  getChipByValue(value: any): any {
    return this.refs[`chip-${value}`];
  }

  renderTags(): Array<React$Element<any>> {
    return this.props.tags.map(tag =>
      <Chip
        key={tag.value}
        ref={`chip-${tag.value}`}
        className={b("tag")()}
        value={tag.value}
        onDelete={this.handleDelete}
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

    const { searchText, focused } = this.state;
    const modifier = { focused };

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
