/* eslint-disable */
import React, { Component, PropTypes } from "react";
import bem from "../../../helpers/bem";
import mergeClassNames from "../../../helpers/merge-class-names";
import bindHandlers from "../../../helpers/bind-handlers";
import {
  BoardIcon
} from "../../svg-icons/";
import {
  Dialog,
  DropDownMenu,
  MenuItem,
  FlatButton
} from "../";

const b = bem("select-board-dialog");

export default class SelectBoardDialog extends Component {
  static propTypes = {
    className: PropTypes.string,
    open: PropTypes.bool,
    processing: PropTypes.bool,
    boards: PropTypes.array,
    defaultValue: PropTypes.any,
    onSelect: PropTypes.func,
    onRequestClose: PropTypes.func
  };

  static defaultProps = {
    processing: false,
    defaultValue: null,
    onSelect: () => {}
  };

  constructor(props, context) {
    super(props, context);

    this.state = {
      value: props.defaultValue
    };

    bindHandlers([
      "handleClose",
      "handleSelect",
      "handleChange"
    ], this);
  }

  componentWillReceiveProps(nextProps) {
    const { props } = this;

    if (!props.open && props.defaultValue !== nextProps.defaultValue) {
      this.setState({ value: nextProps.defaultValue });
    }
  }

  handleClose() {
    const { onRequestClose } = this.props;
    if (typeof onRequestClose === "function") {
      onRequestClose();
    }
  }

  handleSelect() {
    this.props.onSelect(this.state.value);
  }

  handleChange(value) {
    this.setState({ value });
  }

  render() {
    const {
      className,
      processing,
      boards,
      defaultValue, // eslint-disable-line no-unused-vars
      ...props
    } = this.props;

    const { value } = this.state;

    return (
      <Dialog
        className={mergeClassNames(b(), className)}
        processing={processing}
        title="Select board"
        titleIcon={<BoardIcon />}
        actions={[
          <FlatButton type="primary" onClick={this.handleClose} disable={processing}>Cancel</FlatButton>,
          <FlatButton
            type="primary"
            onClick={this.handleSelect}
            disable={processing || !value}
          >
            Select
          </FlatButton>
        ]}
        {...props}
      >
        <DropDownMenu
          type="block"
          value={value}
          onChange={this.handleChange}
        >
          {boards.map(board =>
            <MenuItem
              key={board.value}
              value={board.value}
              text={board.name}
            />
          )}
        </DropDownMenu>
      </Dialog>
    );
  }
}
