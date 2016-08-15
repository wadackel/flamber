/* eslint-disable */
import React, { Component, PropTypes } from "react";
import { connect } from "react-redux";
import * as TagActions from "../../../actions/tags";
import bem from "../../../helpers/bem";
import bindHandlers from "../../../helpers/bind-handlers";
import {
  Drawer,
  List,
  ListItem,
  TextField
} from "../../../components/ui/";

const b = bem("tag-drawer");

export class TagDrawerContainer extends Component {
  static propTypes = {
  };

  constructor(props, context) {
    super(props, context);
  }

  renderFooter() {
    return (
      <div className={b("footer")}>
        <TextField
          className={b("add-tag")}
          label="Add tag"
          placeholder="Type tag name"
          onEnter={console.log}
        />
      </div>
    );
  }

  render() {
    const {
      tags
    } = this.props;

    return (
      <Drawer
        className={b()}
        open={tags.drawerOpen}
        footer={this.renderFooter()}
      >
        <List>
          <ListItem text="TODO 1" />
          <ListItem text="TODO 2" />
          <ListItem text="TODO 3" />
          <ListItem text="TODO 4" />
          <ListItem text="TODO 5" />
          <ListItem text="TODO 6" />
          <ListItem text="TODO 7" />
          <ListItem text="TODO 8" />
          <ListItem text="TODO 9" />
          <ListItem text="TODO 10" />
        </List>
      </Drawer>
    );
  }
}

export default connect(
  state => ({
    tags: state.tags
  }),
  null,
  null,
  { pure: false }
)(TagDrawerContainer);
