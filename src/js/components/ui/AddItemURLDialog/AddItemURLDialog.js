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

const b = bem("add-item-url-dialog");

export default class AddItemURLDialog extends Component {
  static propTypes = {
    className: PropTypes.string,
    processing: PropTypes.bool,
    width: PropTypes.number,
    open: PropTypes.bool,
    selectBoards: PropTypes.arrayOf(PropTypes.shape({
      name: PropTypes.string,
      value: PropTypes.any
    })),
    defaultBoard: PropTypes.any,
    onRequestAdd: PropTypes.func,
    onRequestClose: PropTypes.func
  };

  static defaultProps = {
    processing: false,
    selectBoards: [],
    onRequestAdd: () => {}
  };

  static childContextTypes = {
    theme: PropTypes.string.isRequired
  };

  getChildContext() {
    return {
      theme: Themes.LIGHT
    };
  }

  constructor(props, context) {
    super(props, context);

    this.state = {
      url: "",
      selectBoard: this.getInitialBoard(props)
    };

    autoBind(this);
  }

  getInitialBoard(props) {
    return props.defaultBoard || (props.selectBoards[0] && props.selectBoards[0].value);
  }

  componentWillReceiveProps(nextProps) {
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
    const { onRequestClose } = this.props;
    if (typeof onRequestClose === "function") {
      onRequestClose();
    }
  }

  handleAdd() {
    const { url, selectBoard } = this.state;

    this.props.onRequestAdd(
      url,
      selectBoard
    );
  }

  handleURLChange(e, value) {
    this.setState({ url: value });
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

    const { url, selectBoard } = this.state;
    const isValidURL = isURL(url, { require_protocol: true }); // eslint-disable-line camelcase

    return (
      <Dialog
        className={mergeClassNames(b(), className)}
        processing={processing}
        title="Add item from URL"
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
