// @flow
import autoBind from "auto-bind";
import deepEqual from "deep-equal";
import isURL from "validator/lib/isURL";
import React, { Component, PropTypes } from "react";
import * as Themes from "../../../constants/themes";
import bem from "../../../helpers/bem";
import mergeClassNames from "../../../helpers/merge-class-names";
import {
  Dialog,
  TextField,
  DropDownMenu,
  MenuItem,
  FlatButton
} from "../";
import { PictureLinkIcon } from "../../svg-icons/";
import type { DropDownBoardValues } from "../../../types/prop-types";

const b = bem("add-item-url-dialog");

type Props = {
  className?: string;
  processing: boolean;
  width?: number;
  open: boolean;
  selectBoards: DropDownBoardValues;
  defaultBoard: any;
  onRequestAdd?: Function;
  onRequestClose?: Function;
};

type State = {
  url: string;
  selectBoard: any;
};

export default class AddItemURLDialog extends Component {
  props: Props;
  state: State;

  static defaultProps = {
    processing: false,
    selectBoards: []
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
      url: "",
      selectBoard: this.getInitialBoard(props)
    };

    autoBind(this);
  }

  getInitialBoard(props: Props): any {
    return props.defaultBoard || (props.selectBoards[0] && props.selectBoards[0].value);
  }

  componentWillReceiveProps(nextProps: Props) {
    const { props } = this;

    if (
      !deepEqual(props.selectBoards, nextProps.selectBoards) ||
      (!props.open && nextProps.open)
    ) {
      this.setState({
        selectBoard: this.getInitialBoard(nextProps)
      });
    }

    if (props.open && !nextProps.open) {
      this.setState({
        url: ""
      });
    }
  }

  handleClose() {
    if (typeof this.props.onRequestClose === "function") {
      this.props.onRequestClose();
    }
  }

  handleAdd() {
    const { url, selectBoard } = this.state;

    if (typeof this.props.onRequestAdd === "function") {
      this.props.onRequestAdd(
        url,
        selectBoard
      );
    }
  }

  handleURLChange(e: SyntheticInputEvent, value: string) {
    this.setState({ url: value });
  }

  handleBoardChange(value: any) {
    this.setState({ selectBoard: value });
  }

  render() {
    const {
      className,
      processing,
      selectBoards,
      ...props
    } = this.props;

    const { url, selectBoard } = this.state;
    const isValidURL = isURL(url, { require_protocol: true }); // eslint-disable-line camelcase

    return (
      <Dialog
        className={mergeClassNames(b(), className)}
        processing={processing}
        title="URLからアイテムを追加"
        titleIcon={<PictureLinkIcon />}
        actions={[
          <FlatButton type="primary" onClick={this.handleClose} disable={processing}>Cancel</FlatButton>,
          <FlatButton
            type="primary"
            onClick={this.handleAdd}
            disable={processing || !isValidURL || !selectBoard}
          >
            Add
          </FlatButton>
        ]}
        {...props}
      >
        <TextField
          className={b("url")()}
          label="URL"
          placeholder="http://flamber.org/"
          value={url}
          error={!isValidURL && url !== "" ? "無効な形式です" : null}
          onChange={this.handleURLChange}
        />

        <DropDownMenu
          type="block"
          className={b("select-board")()}
          value={selectBoard}
          onChange={this.handleBoardChange}
        >
          {selectBoards.map(obj =>
            <MenuItem
              key={obj.value}
              value={obj.value}
              primary={obj.name}
            />
          )}
        </DropDownMenu>
      </Dialog>
    );
  }
}
