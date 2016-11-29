// @flow
import React, { Component, PropTypes } from "react";
import * as Themes from "../../../constants/themes";
import bem from "../../../helpers/bem";
import mergeClassNames from "../../../helpers/merge-class-names";
import {
  Dialog,
  FlatButton,
  TextField,
  Checkbox
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
  secret: boolean;
};

export default class AddBoardDialog extends Component {
  props: Props;
  state: State = {
    value: "",
    secret: true
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
    const { value, secret } = this.state;
    const trimmedBoardName = value.trim();

    if (trimmedBoardName !== "" && typeof this.props.onRequestAdd === "function") {
      this.props.onRequestAdd(trimmedBoardName, secret);
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

  handleSecretCheck = () => {
    this.setState({ secret: !this.state.secret });
  }

  render() {
    const {
      className,
      processing,
      ...props
    } = this.props;

    const { value, secret } = this.state;

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
          label="ボード名"
          onChange={this.handleBoardNameChange}
          onEnter={this.handleAdd}
        />

        <Checkbox
          label="このボードを公開しない"
          checked={secret}
          onCheck={this.handleSecretCheck}
        />
      </Dialog>
    );
  }
}
