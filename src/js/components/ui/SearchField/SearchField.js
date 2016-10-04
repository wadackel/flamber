// @flow
import autoBind from "auto-bind";
import React, { Component } from "react";
import bem from "../../../helpers/bem";
import mergeClassNames from "../../../helpers/merge-class-names";
import { TextField, IconButton } from "../";
import { SearchIcon } from "../../svg-icons/";

const b = bem("search-field");

type Props = {
  className?: string;
  value: string;
  placeholder?: string;
  onSearch?: Function;
};

type State = {
  value: string;
};

export default class SearchField extends Component {
  props: Props;
  state: State;

  constructor(props: Props, context: Object) {
    super(props, context);

    this.state = { value: props.value };

    autoBind(this);
  }

  componentWillReceiveProps(nextProps: Props) {
    if (this.props.value !== nextProps.value) {
      this.setState({ value: nextProps.value });
    }
  }

  handleClick() {
    this.requestSearch();
  }

  handleChange(e: SyntheticInputEvent, value: string) {
    this.setState({ value });
  }

  handleEnter() {
    this.requestSearch();
  }

  requestSearch() {
    if (typeof this.props.onSearch === "function") {
      this.props.onSearch(this.state.value);
    }
  }

  render() {
    const {
      className,
      placeholder
    } = this.props;

    const { value } = this.state;

    return (
      <div className={mergeClassNames(b(), className)}>
        <div className={b("body")()}>
          <IconButton
            className={b("button")()}
            icon={<SearchIcon />}
            onClick={this.handleClick}
          />
          <TextField
            className={b("text-field")()}
            placeholder={placeholder}
            value={value}
            onChange={this.handleChange}
            onEnter={this.handleEnter}
          />
        </div>
      </div>
    );
  }
}
