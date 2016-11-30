// @flow
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
  Collapse,
  MenuItem,
  FlatButton
} from "../";
import { PictureLinkIcon } from "../../svg-icons/";
import type { DropDownBoardValues, ScreenshotFormat } from "../../../types/prop-types";


const b = bem("add-item-url-dialog");

type Props = {
  className?: string;
  processing?: string | boolean;
  width?: number;
  open: boolean;
  selectBoards: DropDownBoardValues;
  defaultBoard: any;
  defaultScreenshotFormat: ScreenshotFormat;
  defaultScreenshotQuality: number;
  onRequestAdd?: Function;
  onRequestClose?: Function;
};

type State = {
  url: string;
  selectBoard: any;
  optionsOpen: boolean;
  screenshotFormat: ScreenshotFormat;
  screenshotQuality: number;
};

export default class AddItemURLDialog extends Component {
  props: Props;
  state: State;

  static defaultProps = {
    processing: false,
    selectBoards: [],
    defaultScreenshotFormat: "jpg",
    defaultScreenshotQuality: 100
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
      selectBoard: this.getInitialBoard(props),
      optionsOpen: false,
      screenshotFormat: props.defaultScreenshotFormat,
      screenshotQuality: props.defaultScreenshotQuality
    };
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

    if (props.defaultScreenshotFormat !== nextProps.defaultScreenshotFormat) {
      this.setState({ screenshotFormat: nextProps.defaultScreenshotFormat });
    }

    if (props.defaultScreenshotQuality !== nextProps.defaultScreenshotQuality) {
      this.setState({ screenshotQuality: nextProps.defaultScreenshotQuality });
    }

    if (props.open && !nextProps.open) {
      this.setState({
        url: ""
      });
    }
  }

  handleAfterOpen = () => {
    this.refs.url.focus();
  }

  handleClose = () => {
    if (typeof this.props.onRequestClose === "function") {
      this.props.onRequestClose();
    }
  }

  handleAdd = () => {
    const {
      url,
      selectBoard,
      screenshotFormat,
      screenshotQuality
    } = this.state;

    if (typeof this.props.onRequestAdd === "function") {
      this.props.onRequestAdd(
        url,
        selectBoard,
        screenshotFormat,
        screenshotQuality
      );
    }
  }

  handleURLChange = (e: SyntheticInputEvent, value: string) => {
    this.setState({ url: value });
  }

  handleBoardChange = (selectBoard: any) => {
    this.setState({ selectBoard });
  }

  handleOptionsToggle = () => {
    this.setState({ optionsOpen: !this.state.optionsOpen });
  }

  handleScreenshotFormatChange = (screenshotFormat: ScreenshotFormat) => {
    this.setState({ screenshotFormat });
  }

  handleScreenshotQualityChange = (screenshotQuality: number) => {
    this.setState({ screenshotQuality });
  }

  render() {
    const {
      className,
      processing,
      selectBoards,
      ...props
    } = this.props;

    const {
      url,
      selectBoard,
      optionsOpen,
      screenshotFormat,
      screenshotQuality
    } = this.state;

    const isValidURL = isURL(url, { require_protocol: true }); // eslint-disable-line camelcase

    return (
      <Dialog
        className={mergeClassNames(b(), className)}
        processing={processing}
        title="URLからアイテムを追加"
        titleIcon={<PictureLinkIcon />}
        actions={[
          <FlatButton type="primary" onClick={this.handleClose} disable={!!processing}>Cancel</FlatButton>,
          <FlatButton
            type="primary"
            onClick={this.handleAdd}
            disable={!!processing || !isValidURL || !selectBoard}
          >
            Add
          </FlatButton>
        ]}
        onAfterOpen={this.handleAfterOpen}
        {...props}
      >
        <TextField
          ref="url"
          className={b("url")()}
          label="URL"
          placeholder="http://flamber.org/"
          value={url}
          error={!isValidURL && url !== "" ? "無効な形式です" : null}
          onChange={this.handleURLChange}
        />

        <div>
          <label>追加先のボード</label>
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
        </div>

        <Collapse
          open={optionsOpen}
          label="Options"
          onToggle={this.handleOptionsToggle}
        >
          <div>
            <label>スクリーンショットのフォーマット</label>
            <DropDownMenu
              type="block"
              value={screenshotFormat}
              onChange={this.handleScreenshotFormatChange}
            >
              <MenuItem value="jpg" primary="JPG" />
              <MenuItem value="png" primary="PNG" />
            </DropDownMenu>
          </div>

          {screenshotFormat === "jpg" &&
            <div>
              <label>スクリーンショットの画質</label>
              <DropDownMenu
                type="block"
                value={screenshotQuality}
                onChange={this.handleScreenshotQualityChange}
              >
                <MenuItem value={60} primary="60%" />
                <MenuItem value={70} primary="70%" />
                <MenuItem value={80} primary="80%" />
                <MenuItem value={90} primary="90%" />
                <MenuItem value={100} primary="100%" />
              </DropDownMenu>
            </div>
          }
        </Collapse>
      </Dialog>
    );
  }
}
