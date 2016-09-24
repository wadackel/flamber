import autoBind from "auto-bind";
import deepEqual from "deep-equal";
import React, { Component, PropTypes } from "react";
import * as Themes from "../../../constants/themes";
import bem from "../../../helpers/bem";
import mergeClassNames from "../../../helpers/merge-class-names";
import getImagePalette from "../../../utils/get-image-palette";
import {
  Dialog,
  DropDownMenu,
  MenuItem,
  FlatButton,
  IconButton
} from "../";
import {
  CloseIcon,
  UploadIcon
} from "../../svg-icons/";

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
    file: PropTypes.any,
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
      selectImage: {
        file: null,
        src: null,
        palette: []
      },
      selectBoard: this.getInitialBoard(props)
    };

    autoBind(this);
  }

  componentWillReceiveProps(nextProps) {
    const { props } = this;

    if (props.file !== nextProps.file) {
      this.setImageByFile(nextProps.file);
    }

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
        selectImage: {
          file: null,
          src: null,
          palette: []
        }
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
    const { selectImage, selectBoard } = this.state;

    this.props.onRequestAdd(
      selectImage.file,
      selectImage.palette,
      selectBoard
    );
  }

  handleFileChange() {
    const { files } = this.refs.file;

    if (files.length > 0) {
      this.setImageByFile(files[0]);
    }
  }

  handlePreviewCloseClick(e) {
    e.stopPropagation();

    this.setState({
      selectImage: {
        file: null,
        src: null,
        palette: []
      }
    });
  }

  handleBoardChange(value) {
    this.setState({ selectBoard: value });
  }

  getInitialBoard(props) {
    return props.defaultBoard || (props.selectBoards[0] && props.selectBoards[0].value);
  }

  setImageByFile(file) {
    if (!file) {
      this.setState({
        selectImage: {
          file: null,
          src: null,
          palette: null
        }
      });

      return;
    }

    const reader = new FileReader();

    reader.onload = () => {
      const src = reader.result;
      const img = new Image();
      img.src = src;

      const palette = getImagePalette(img);

      this.setState({
        selectImage: {
          file,
          src,
          palette
        }
      });
    };

    reader.readAsDataURL(file);
  }

  render() {
    const {
      className,
      processing,
      selectBoards,
      ...props
    } = this.props;

    const {
      selectImage,
      selectBoard
    } = this.state;

    return (
      <Dialog
        className={mergeClassNames(b(), className)}
        processing={processing}
        title="ファイルからアイテムを追加"
        titleIcon={<UploadIcon />}
        actions={[
          <FlatButton type="primary" onClick={this.handleClose} disable={processing}>Cancel</FlatButton>,
          <FlatButton
            type="primary"
            onClick={this.handleAdd}
            disable={processing || !selectImage.src || !selectBoard}
          >
            Add
          </FlatButton>
        ]}
        {...props}
      >
        <div className={b("browse")()}>
          <input
            type="file"
            ref="file"
            className={b("browse__input")()}
            accept="image/*"
            onChange={this.handleFileChange}
          />
          <p className={b("browse__title")()}>ドラッグ&amp;ドロップ又はファイルを選択</p>
          {selectImage.src && <div className={b("preview")()}>
            <IconButton
              className={b("preview__close")()}
              size="sm"
              icon={<CloseIcon />}
              onClick={this.handlePreviewCloseClick}
            />
            <img className={b("preview__image")()} src={selectImage.src} />
            <ul className={b("preview__palette")()}>
              {selectImage.palette.map((hex, index) =>
                <li
                  key={index}
                  className={b("preview__color")()}
                  style={{
                    backgroundColor: hex
                  }}>
                </li>
              )}
            </ul>
          </div>}
        </div>

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
