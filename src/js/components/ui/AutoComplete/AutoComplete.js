// @flow
import keycode from "keycode";
import autoBind from "auto-bind";
import React from "react";
import ReactDOM from "react-dom";
import bem from "../../../helpers/bem";
import mergeClassNames from "../../../helpers/merge-class-names";
import {
  TextField,
  Menu,
  MenuItem,
  Popover
} from "../";
import type { Origin } from "../../../types/prop-types";

const b = bem("auto-complete");

export type DataSource = Array<any>;

export type DataSourceConfig = {
  text: string;
  value: any;
};

export type Filter = (searchText: string, key: string) => boolean;

type Props = {
  className?: string;
  id?: string;
  label?: string;
  placeholder?: string;
  name?: string;
  origin: Origin;
  triggerOrigin: Origin;
  openOnFocus: boolean;
  dataSource: DataSource;
  dataSourceConfig: DataSourceConfig;
  searchText: string;
  maxSearchResults: number;
  filter: Filter;
  menuCloseDelay: number;
  onNewRequest?: Function;
  onUpdateInput?: Function;
  onFocus?: Function;
  onBlur?: Function;
  onKeyDown?: Function;
  onKeyPress?: Function;
  onKeyUp?: Function;
};

type State = {
  searchText: string;
  open: boolean;
  triggerElement: ?HTMLElement;
  focusTextField: boolean;
};

export default class AutoComplete extends React.Component {
  props: Props;
  state: State;
  static defaultProps = {
    origin: {
      vertical: "top",
      horizontal: "left"
    },
    triggerOrigin: {
      vertical: "bottom",
      horizontal: "left"
    },
    dataSourceConfig: {
      text: "text",
      value: "value"
    },
    openOnFocus: false,
    searchText: "",
    maxSearchResults: -1,
    filter: (searchText: string, key: string) =>
      searchText === "" ||
      (searchText !== key && key.toLowerCase().indexOf(searchText.toLowerCase()) !== -1),
    menuCloseDelay: 300
  };

  static noFilter() {
    return true;
  }

  timerMenuItemClickClose: number = 0;

  constructor(props: Props, context: Object) {
    super(props, context);

    this.state = {
      searchText: props.searchText,
      open: false,
      triggerElement: null,
      focusTextField: true
    };

    autoBind(this);
  }

  componentDidMount() {
    this.setMenuWidth();
  }

  componentDidUpdate() {
    this.setMenuWidth();
  }

  componentWillUnmount() {
    clearTimeout(this.timerMenuItemClickClose);
  }

  componentWillReceiveProps(nextProps: Props) {
    if (this.state.searchText !== nextProps.searchText) {
      this.setState({
        searchText: nextProps.searchText
      });
    }
  }

  handleChange(e: SyntheticInputEvent, value: any) {
    if (value === this.state.searchText) {
      return;
    }

    this.setState({
      searchText: value,
      open: true,
      triggerElement: ReactDOM.findDOMNode(this.refs.searchTextField)
    }, () => {
      this.setMenuWidth();
      if (typeof this.props.onUpdateInput === "function") {
        this.props.onUpdateInput(value, this.props.dataSource);
      }
    });
  }

  handleFocus(e: SyntheticFocusEvent) {
    this.setState({
      focusTextField: true,
      open: this.props.openOnFocus,
      triggerElement: ReactDOM.findDOMNode(this.refs.searchTextField)
    });

    if (typeof this.props.onFocus === "function") {
      this.props.onFocus(e);
    }
  }

  handleBlur(e: SyntheticFocusEvent) {
    if (this.state.focusTextField && !this.timerMenuItemClickClose) {
      this.close();
    }

    if (typeof this.props.onBlur === "function") {
      this.props.onBlur(e);
    }
  }

  handleKeyDown(e: SyntheticKeyboardEvent) {
    const key = keycode(e);

    if (typeof this.props.onKeyDown === "function") {
      this.props.onKeyDown(e);
    }

    switch (key) {
      case "esc":
        this.close();
        break;

      case "down":
        e.preventDefault();
        this.setState({
          open: true,
          focusTextField: false,
          triggerElement: ReactDOM.findDOMNode(this.refs.searchTextField)
        });
        break;
    }
  }

  handleEnter() {
    const { searchText } = this.state;
    const finalSearchText = searchText.trim();

    if (finalSearchText !== "") {
      this.triggerNewRequest(finalSearchText, -1);
    }
  }

  handleMenuItemClick(menuItem: MenuItem, value: any, index: number) {
    const { menuCloseDelay } = this.props;

    this.timerMenuItemClickClose = setTimeout(() => {
      this.setState({ searchText: menuItem.props.primary });
      this.triggerNewRequest(value, index);
      this.close();
      this.focus();
      this.timerMenuItemClickClose = 0;
    }, menuCloseDelay);
  }

  handleMenuMouseDown(e: SyntheticMouseEvent) {
    e.preventDefault();
  }

  handleEscKeyDown() {
    this.close();
  }

  handleUpdateFocusIndex(index: number) {
    const maxIndex = this.refs.menu.props.children.length - 1;

    if (index < 0 || index > maxIndex) {
      this.close(() => {
        this.focus();
      });
    }
  }

  handleRequestClose(type: string) {
    if (!this.state.focusTextField || type === "scroll" || type === "resize") {
      this.close();
    }
  }

  triggerNewRequest(searchText: string, index: number): void {
    if (typeof this.props.onNewRequest === "function") {
      this.props.onNewRequest(searchText, index);
    }
  }

  setMenuWidth(): void {
    if (!this.state.open) return;

    const searchTextField = ReactDOM.findDOMNode(this.refs.searchTextField);
    const menu = ReactDOM.findDOMNode(this.refs.menu);

    if (!menu) return;

    menu.style.width = `${searchTextField.offsetWidth}px`;
  }

  close(callback: ?Function = null) {
    this.setState({
      open: false,
      triggerElement: null
    }, callback == null ? () => {} : callback);
  }

  focus() {
    this.refs.searchTextField.focus();
  }

  blur() {
    this.refs.searchTextField.blur();
  }

  render() {
    const {
      className,
      label,
      openOnFocus,
      filter,
      placeholder,
      origin,
      triggerOrigin,
      dataSource,
      dataSourceConfig,
      maxSearchResults,
      onKeyUp,
      onKeyPress
    } = this.props;

    const {
      searchText,
      open,
      triggerElement,
      focusTextField
    } = this.state;

    const menuItems = [];

    dataSource.every((item, index) => {
      if (typeof item === "object") {
        const itemText = item[dataSourceConfig.text];
        if (!filter(searchText, itemText, item)) return true;

        const itemValue = item[dataSourceConfig.value];
        menuItems.push({
          text: itemText,
          value: (
            <MenuItem
              primary={itemText}
              value={itemValue}
              key={index}
            />
          )
        });

      } else if (filter(searchText, item, item)) {
        menuItems.push({
          text: item,
          value: (
            <MenuItem
              value={item}
              primary={item}
              key={index}
            />
          )
        });
      }

      return !(maxSearchResults > 0 && menuItems.length === maxSearchResults);
    });

    const menuElement = open && menuItems.length > 0 && (
      <Menu
        ref="menu"
        disableAutoFocus={focusTextField}
        initiallyKeyboardFocused={openOnFocus}
        onItemClick={this.handleMenuItemClick}
        onMouseDown={this.handleMenuMouseDown}
        onEscKeyDown={this.handleEscKeyDown}
        onUpdateFocusIndex={this.handleUpdateFocusIndex}
      >
        {menuItems.map(i => i.value)}
      </Menu>
    );

    return (
      <div className={mergeClassNames(b(), className)}>
        <TextField
          ref="searchTextField"
          value={searchText}
          label={label}
          placeholder={placeholder}
          onChange={this.handleChange}
          onFocus={this.handleFocus}
          onBlur={this.handleBlur}
          onEnter={this.handleEnter}
          onKeyDown={this.handleKeyDown}
          onKeyUp={onKeyUp}
          onKeyPress={onKeyPress}
        />
        <Popover
          ref="popover"
          origin={origin}
          triggerOrigin={triggerOrigin}
          triggerElement={triggerElement}
          open={open}
          useLayerForClickAway={false}
          onRequestClose={this.handleRequestClose}
        >
          {menuElement}
        </Popover>
      </div>
    );
  }
}
