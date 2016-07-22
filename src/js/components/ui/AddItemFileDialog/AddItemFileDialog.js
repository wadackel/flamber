/* eslint-disable */
import React, { Component, PropTypes } from "react";
import bem from "../../../helpers/bem";
import mergeClassNames from "../../../helpers/merge-class-names";
import bindHandlers from "../../../helpers/bind-handlers";
import {
  Dialog,
  DropDownMenu,
  MenuItem,
  FlatButton,
  TextField
} from "../";
import { UploadIcon } from "../../svg-icons/";

const b = bem("add-item-file-dialog");

export default class AddItemFileDialog extends Component {
  static propTypes = {
    className: PropTypes.string,
    processing: PropTypes.bool,
    width: PropTypes.number,
    open: PropTypes.bool,
    selectBoards: PropTypes.arrayOf(PropTypes.shape({
      name: PropTypes.string,
      value: PropTypes.any
    })),
    onRequestAdd: PropTypes.func,
    onRequestClose: PropTypes.func
  };

  static defaultProps = {
    processing: false,
    selectBoards: [],
    onRequestAdd: () => {}
  };

  constructor(props, context) {
    super(props, context);

    this.state = {
      selectBoard: props.selectBoards[0] && props.selectBoards[0].value
    };

    bindHandlers([
      "handleClose",
      "handleAdd",
      "handleBoardChange"
    ], this);
  }

  handleClose() {
    const { onRequestClose } = this.props;
    if (typeof onRequestClose === "function") {
      onRequestClose();
    }
  }

  handleAdd() {
    console.log("TODO");
  }

  handleBoardChange(value) {
    this.setState({ selectBoard: value });
  }

  render() {
    const {
      className,
      processing,
      selectBoards,
      ...props
    } = this.props;

    const {
      selectBoard
    } = this.state;

    return (
      <Dialog
        className={mergeClassNames(b(), className)}
        processing={processing}
        title="Add item from file"
        titleIcon={<UploadIcon />}
        actions={[
          <FlatButton type="primary" onClick={this.handleClose} disable={processing}>Cancel</FlatButton>,
          <FlatButton
            type="primary"
            onClick={this.handleAdd}
            disable={processing}
          >
            Add
          </FlatButton>
        ]}
        {...props}
      >
        <DropDownMenu
          type="block"
          className={b("select-board")}
          value={selectBoard}
          onChange={this.handleBoardChange}
        >
          {selectBoards.map(obj =>
            <MenuItem
              key={obj.value}
              value={obj.value}
              text={obj.name}
            />
          )}
        </DropDownMenu>
      </Dialog>
    );
  }
}
