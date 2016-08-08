/* eslint-disable */
import React, { Component, PropTypes } from "react";
import { connect } from "react-redux";
import { push } from "react-router-redux";
import EventListener from "react-event-listener";
import { detectKeyString } from "key-string";
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

    bindHandlers([
      "handleKeyDown"
    ], this);
  }

  handleKeyDown(e) {
    if (e.target === document.body) {
      this.execShortcut(detectKeyString(e));
    }
  }

  execShortcut(shortcut) {
    console.log(shortcut);

    switch (shortcut) {
      case "Shift+B":
        this.props.dispatch(BoardActions.addBoardDialogOpen());
        break;

      case "Shift+L":
        console.log("TODO: Item (Link)");
        break;

      case "Shift+F":
        this.props.dispatch(ItemActions.addItemDialogOpen());
        break;

      case "Comma":
        this.props.dispatch(push("/app/settings"));
        break;

      case "Shift+Slash":
        console.log("TODO: Help");
        break;
    }
  }

  render() {
    return (
      <div className={b()}>
        <EventListener
          target="document"
          onKeyDown={this.handleKeyDown}
        />
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
