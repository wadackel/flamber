/* eslint-disable */
import _ from "lodash";
import React, { Component, PropTypes } from "react";
import { connect } from "react-redux";
import { push } from "react-router-redux";
import Combokeys from "combokeys";
import * as BoardActions from "../../actions/boards";
import * as ItemActions from "../../actions/items";
import bem from "../../helpers/bem";
import bindHandlers from "../../helpers/bind-handlers";

const b = bem("shortcut-key");

export class ShortcutKeySubContainer extends Component {
  static propTypes = {
  };

  static defaultProps = {
  };

  constructor(props, context) {
    super(props, context);

    this.keyMaps = {
      "?": this.handleHelp,
      "shift+b": this.handleAddBoard,
      "shift+l": this.handleAddItem,
      "shift+u": this.handleAddItemFile,
      ",": this.handleSettings,
    };
  }

  componentDidMount() {
    this.combokeys = new Combokeys(document.documentElement);

    _.forIn(this.keyMaps, (handler, keyString) => {
      this.combokeys.bind(keyString, handler.bind(this));
    });
  }

  componentWillUnmount() {
    if (this.combokeys) {
      this.combokeys.detach();
      this.combokeys = null;
    }
  }

  handleHelp() {
    console.log("TODO: Help");
  }

  handleAddBoard() {
    this.props.dispatch(BoardActions.addBoardDialogOpen());
  }

  handleAddItemFile() {
    this.props.dispatch(ItemActions.addItemDialogOpen());
  }

  handleAddItem() {
    console.log("TODO: Add item");
  }

  handleSettings() {
    this.props.dispatch(push("/app/settings"));
  }

  render() {
    return (
      <div className={b()}>
        {/* TODO */}
      </div>
    );
  }
}

export default connect(
  state => state,
  null,
  null,
  { pure: false }
)(ShortcutKeySubContainer);
