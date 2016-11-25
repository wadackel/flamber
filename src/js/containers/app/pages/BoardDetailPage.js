/* eslint-disable */
import _ from "lodash";
import React, { Component, PropTypes } from "react";
import { connect } from "react-redux";
import bem from "../../../helpers/bem";
import * as BoardActions from "../../../actions/boards";
import * as ItemActions from "../../../actions/items";
import { getCurrentBoard } from "../../../selectors/boards";
import { ItemsContainer } from "../ui/";
import { EmptyData, RaisedButton } from "../../../components/ui/";
import { PictureLinkIcon } from "../../../components/svg-icons/";

const b = bem("board-detail-page");

export class BoardDetailPage extends Component {
  componentDidMount() {
    this.props.dispatch(BoardActions.setCurrentBoard(this.props.params.id));
  }

  componentWillReceiveProps(nextProps) {
    const { params } = this.props;

    if (params.id !== nextProps.params.id) {
      this.props.dispatch(BoardActions.setCurrentBoard(nextProps.params.id));
    }
  }

  componentWillUnmount() {
    this.props.dispatch(BoardActions.setCurrentBoard(null));
  }

  handleAddItemClick = () => {
    this.props.dispatch(ItemActions.addItemURLDialogOpen());
  }

  render() {
    return (
      <div className={b()}>
        <ItemsContainer
          emptyComponent={<EmptyData
            title="No items"
            icon={<PictureLinkIcon />}
            action={<RaisedButton onClick={this.handleAddItemClick}>Add item</RaisedButton>}
          >
            アイテムがありません。<br />
            新しいアイテムを追加しましょう。
          </EmptyData>}
        />
      </div>
    );
  }
}

export default connect(
  state => ({
    currentBoard: getCurrentBoard(state)
  })
)(BoardDetailPage);
