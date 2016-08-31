import keycode from "keycode";
import autoBind from "auto-bind";
import React, { PropTypes } from "react";
import ReactDOM from "react-dom";
import * as OriginalPropTypes from "../../../constants/prop-types";
import bem from "../../../helpers/bem";
import mergeClassNames from "../../../helpers/merge-class-names";
import {
  TextField,
  Menu,
  MenuItem,
  Popover
} from "../";

const b = bem("auto-complete");

export default class AutoComplete extends React.Component {
  static propTypes = {
    className: PropTypes.string,
    origin: OriginalPropTypes.origin,
    triggerOrigin: OriginalPropTypes.origin,
    id: PropTypes.string,
    openOnFocus: PropTypes.bool,
    dataSource: PropTypes.array,
    dataSourceConfig: PropTypes.shape({
      text: PropTypes.string,
      value: PropTypes.string
    }),
    searchText: PropTypes.string,
    maxSearchResults: PropTypes.number,
    filter: PropTypes.func,
    label: PropTypes.string,
    placeholder: PropTypes.string,
    name: PropTypes.string,
    menuCloseDelay: PropTypes.number,
    onNewRequest: PropTypes.func,
    onUpdateInput: PropTypes.func,
    onFocus: PropTypes.func,
    onBlur: PropTypes.func,
    onKeyDown: PropTypes.func,
    onKeyPress: PropTypes.func,
    onKeyUp: PropTypes.func
  };

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
    filter: (searchText, key) => searchText === "" || key.toLowerCase().indexOf(searchText.toLowerCase()) !== -1,
    menuCloseDelay: 300,
    onNewRequest: () => {},
    onUpdateInput: () => {},
    onFocus: () => {},
    onBlur: () => {},
    onKeyDown: () => {},
    onKeyUp: () => {},
    onKeyPress: () => {}
  };

  static noFilter() {
    return true;
  }

  constructor(props, context) {
    super(props, context);

    this.state = {
      searchText: props.searchText,
      open: false,
      triggerElement: null,
      focusTextField: true
    };

    this.timerMenuItemClickClose = null;

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

  componentWillReceiveProps(nextProps) {
    if (this.props.searchText !== nextProps.searchText) {
      this.setState({
        searchText: nextProps.searchText
      });
    }
  }

  handleChange(e, value) {
    if (value === this.state.searchText) {
      return;
    }

    this.setState({
      searchText: value,
      open: true,
      triggerElement: ReactDOM.findDOMNode(this.refs.searchTextField)
    }, () => {
      this.setMenuWidth();
      this.props.onUpdateInput(value, this.props.dataSource);
    });
  }

  handleFocus(e) {
    this.setState({
      focusTextField: true,
      open: this.props.openOnFocus,
      triggerElement: ReactDOM.findDOMNode(this.refs.searchTextField)
    });

    this.props.onFocus(e);
  }

  handleBlur(e) {
    if (this.state.focusTextField && this.timerMenuItemClickClose == null) {
      this.close();
    }

    this.props.onBlur(e);
  }

  handleKeyDown(e) {
    const key = keycode(e);
    this.props.onKeyDown(e);

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

  handleMenuItemClick(menuItem, value, index) {
    const { menuCloseDelay } = this.props;

    this.props.onNewRequest(value, index);

    this.timerMenuItemClickClose = setTimeout(() => {
      this.setState({ searchText: menuItem.props.text });
      this.close();
      this.focus();
      this.timerMenuItemClickClose = null;
    }, menuCloseDelay);
  }

  handleMenuMouseDown(e) {
    e.preventDefault();
  }

  handleEscKeyDown() {
    this.close();
    this.focus();
  }

  handleRequestClose(type) {
    if (!this.state.focusTextField || type === "scroll" || type === "resize") {
      this.close();
    }
  }

  setMenuWidth() {
    if (!this.state.open) return;

    const searchTextField = ReactDOM.findDOMNode(this.refs.searchTextField);
    const menu = ReactDOM.findDOMNode(this.refs.menu);

    if (!menu) return;

    menu.style.width = `${searchTextField.offsetWidth}px`;
  }

  close() {
    this.setState({
      open: false,
      triggerElement: null
    });
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
              text={itemText}
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
              text={item}
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
        onKeyDown={this.handleMenuKeyDown}
        onEscKeyDown={this.handleEscKeyDown}
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
