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
    width: PropTypes.number,
    open: PropTypes.bool,
    onRequestAdd: PropTypes.func,
    onRequestClose: PropTypes.func
  };

  static defaultProps = {
    onRequestAdd: () => {}
  };

  constructor(props, context) {
    super(props, context);

    this.state = {
      boardName: ""
    };

    bindHandlers([
      "handleClose",
      "handleAdd",
      "handleBoardNameChange"
    ], this);
  }

  handleClose() {
    const { onRequestClose } = this.props;
    if (typeof onRequestClose === "function") {
      onRequestClose();
    }
  }

  handleAdd() {
    const { boardName } = this.state;
    const trimmedBoardName = boardName.trim();

    if (trimmedBoardName !== "") {
      this.props.onRequestAdd(trimmedBoardName);
    }
  }

  handleBoardNameChange(e, value) {
    this.setState({ boardName: value });
  }

  render() {
    const {
      className,
      ...props
    } = this.props;

    const { boardName } = this.state;

    return (
      <Dialog
        className={mergeClassNames(b(), className)}
        title="Add board"
        titleIcon={<BoardIcon />}
        actions={[
          <FlatButton type="primary" onClick={this.handleClose}>Cancel</FlatButton>,
          <FlatButton
            type="primary"
            onClick={this.handleAdd}
            disable={boardName.trim() === ""}
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
