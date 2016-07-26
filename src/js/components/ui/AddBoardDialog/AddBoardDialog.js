import React, { Component, PropTypes } from "react";
import bem from "../../../helpers/bem";
import mergeClassNames from "../../../helpers/merge-class-names";
import bindHandlers from "../../../helpers/bind-handlers";
import {
  Dialog,
  FlatButton,
  TextField
} from "../";
import { BoardIcon } from "../../svg-icons/";

const b = bem("add-board-dialog");

export default class AddBoardDialog extends Component {
  static propTypes = {
    className: PropTypes.string,
    processing: PropTypes.bool,
    width: PropTypes.number,
    open: PropTypes.bool,
    onRequestAdd: PropTypes.func,
    onRequestClose: PropTypes.func
  };

  static defaultProps = {
    processing: false,
    onRequestAdd: () => {}
  };

  constructor(props, context) {
    super(props, context);

    this.state = {
      value: ""
    };

    bindHandlers([
      "handleClose",
      "handleAdd",
      "handleBoardNameChange"
    ], this);
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.open && !nextProps.open) {
      this.setState({ value: "" });
    }
  }

  handleClose() {
    const { onRequestClose } = this.props;
    if (typeof onRequestClose === "function") {
      onRequestClose();
    }
  }

  handleAdd() {
    const { value } = this.state;
    const trimmedBoardName = value.trim();

    if (trimmedBoardName !== "") {
      this.props.onRequestAdd(trimmedBoardName);
    }
  }

  handleBoardNameChange(e, value) {
    if (!this.props.processing) {
      this.setState({ value });
    }
  }

  render() {
    const {
      className,
      processing,
      ...props
    } = this.props;

    const { value } = this.state;

    return (
      <Dialog
        className={mergeClassNames(b(), className)}
        processing={processing}
        title="Add board"
        titleIcon={<BoardIcon />}
        actions={[
          <FlatButton type="primary" onClick={this.handleClose} disable={processing}>Cancel</FlatButton>,
          <FlatButton
            type="primary"
            onClick={this.handleAdd}
            disable={value.trim() === "" || processing}
          >
            Add
          </FlatButton>
        ]}
        {...props}
      >
        <TextField
          label="Type board name"
          onChange={this.handleBoardNameChange}
          onEnter={this.handleAdd}
        />
      </Dialog>
    );
  }
}
