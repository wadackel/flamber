import React, { Component, PropTypes } from "react";
import bem from "../../../helpers/bem";
import mergeClassNames from "../../../helpers/merge-class-names";
import bindHandlers from "../../../helpers/bind-handlers";
import { TextField, IconButton } from "../";
import { SearchIcon } from "../../svg-icons/";

const b = bem("search-field");

export default class SearchField extends Component {
  static propTypes = {
    className: PropTypes.string,
    value: PropTypes.any,
    placeholder: PropTypes.string,
    onSearch: PropTypes.func
  };

  static defaultProps = {
    onSearch: () => {}
  };

  constructor(props, context) {
    super(props, context);

    this.state = { value: props.value };

    bindHandlers([
      "handleClick",
      "handleChange",
      "handleEnter"
    ], this);
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.value !== nextProps.value) {
      this.setState({ value: nextProps.value });
    }
  }

  handleClick() {
    this.requestSearch();
  }

  handleChange(e, value) {
    this.setState({ value });
  }

  handleEnter() {
    this.requestSearch();
  }

  requestSearch() {
    this.props.onSearch(this.state.value);
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
