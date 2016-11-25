// @flow
import React, { Component, PropTypes } from "react";
import * as Themes from "../../../constants/themes";
import bem from "../../../helpers/bem";
import mergeClassNames from "../../../helpers/merge-class-names";
import {
  Dialog,
  FlatButton,
  TextField
} from "../";
import { BoardIcon } from "../../svg-icons/";

const b = bem("add-board-dialog");

type Props = {
  className?: string;
  processing?: string | boolean;
  width?: number;
  open: boolean;
  onRequestAdd?: Function;
  onRequestClose?: Function;
};

type State = {
  value: string;
};

export default class AddBoardDialog extends Component {
  props: Props;
  state: State = {
    value: ""
  };

  static defaultProps = {
    processing: false
  };

  static childContextTypes = {
    theme: PropTypes.string.isRequired
  };

  getChildContext() {
    return {
      theme: Themes.LIGHT
    };
  }

  componentWillReceiveProps(nextProps: Props) {
    if (this.props.open && !nextProps.open) {
      this.setState({ value: "" });
    }
  }

  handleClose = () => {
    const { onRequestClose } = this.props;
    if (typeof onRequestClose === "function") {
      onRequestClose();
    }
  }

  handleAdd = () => {
    const { value } = this.state;
    const trimmedBoardName = value.trim();

    if (trimmedBoardName !== "" && typeof this.props.onRequestAdd === "function") {
      this.props.onRequestAdd(trimmedBoardName);
    }
  }

  handleBoardNameChange = (e: SyntheticInputEvent, value: string) => {
    if (!this.props.processing) {
      this.setState({ value });
    }
  }

  handleAfterOpen = () => {
    this.refs.boardName.focus();
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
        title="ボードを追加"
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
        onAfterOpen={this.handleAfterOpen}
        {...props}
      >
        <TextField
          ref="boardName"
          label="Type board name"
          onChange={this.handleBoardNameChange}
          onEnter={this.handleAdd}
        />
      </Dialog>
    );
  }
}
