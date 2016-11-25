/* eslint-disable */
import _ from "lodash";
import React, { Component, PropTypes } from "react";
import { connect } from "react-redux";
import { push } from "react-router-redux";
import Combokeys from "combokeys";
import * as BoardActions from "../../../actions/boards";
import * as ItemActions from "../../../actions/items";
import * as TagActions from "../../../actions/tags";
import bem from "../../../helpers/bem";

const b = bem("shortcut-key-container");

export class ShortcutKeyContainer extends Component {
  constructor(props, context) {
    super(props, context);

    this.keyMaps = {
      "?": this.handleHelp,
      "shift+b": this.handleAddBoard,
      "shift+l": this.handleAddItem,
      "shift+u": this.handleAddItemFile,
      ",": this.handleSettings,
      "t": this.handleTagDrawerToggle
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

  handleHelp = () => {
    console.log("TODO: Help");
  }

  handleAddBoard = () => {
    this.props.dispatch(BoardActions.addBoardDialogOpen());
  }

  handleAddItemFile = () => {
    this.props.dispatch(ItemActions.addItemFileDialogOpen());
  }

  handleAddItem = () => {
    this.props.dispatch(ItemActions.addItemURLDialogOpen());
  }

  handleSettings = () => {
    this.props.dispatch(push("/app/settings"));
  }

  handleTagDrawerToggle = () => {
    this.props.dispatch(TagActions.tagDrawerToggle());
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
  state => state
)(ShortcutKeyContainer);
