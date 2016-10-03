// @flow
import deepEqual from "deep-equal";
import autoBind from "auto-bind";
import React, { Component, PropTypes } from "react";
import * as Themes from "../../../constants/themes";
import bem from "../../../helpers/bem";
import mergeClassNames from "../../../helpers/merge-class-names";
import {
  BoardIcon
} from "../../svg-icons/";
import {
  Dialog,
  DropDownMenu,
  MenuItem,
  FlatButton
} from "../";
import type { DropDownBoardValues } from "../../../types/prop-types";

const b = bem("select-board-dialog");

type Props = {
  className?: string;
  open: boolean;
  processing: boolean;
  boards: DropDownBoardValues;
  onSelect?: Function;
  onRequestClose?: Function;
};

type State = {
  value?: any;
};

export default class SelectBoardDialog extends Component {
  props: Props;
  state: State;

  static defaultProps = {
    processing: false,
    onSelect: () => {}
  };

  static childContextTypes = {
    theme: PropTypes.string.isRequired
  };

  getChildContext() {
    return {
      theme: Themes.LIGHT
    };
  }

  constructor(props: Props, context: Object) {
    super(props, context);

    this.state = {
      value: props.boards[0] && props.boards[0].value
    };

    autoBind(this);
  }

  componentWillReceiveProps(nextProps: Props) {
    const { props } = this;

    if (!deepEqual(props.boards, nextProps.boards)) {
      this.setState({
        value: nextProps.boards[0] && nextProps.boards[0].value
      });
    }
  }

  handleClose() {
    if (typeof this.props.onRequestClose === "function") {
      this.props.onRequestClose();
    }
  }

  handleSelect() {
    if (typeof this.props.onSelect === "function") {
      this.props.onSelect(this.state.value);
    }
  }

  handleChange(value: any) {
    this.setState({ value });
  }

  render() {
    const {
      className,
      processing,
      boards,
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
              primary={board.name}
            />
          )}
        </DropDownMenu>
      </Dialog>
    );
  }
}
