import autoBind from "auto-bind";
import React, { Component, PropTypes } from "react";
import { connect } from "react-redux";
import bem from "../../../helpers/bem";
import * as ItemVisibilityFilters from "../../../constants/item-visibility-filters";
import * as BoardActions from "../../../actions/boards";
import * as ItemActions from "../../../actions/items";
import { ItemsContainer } from "../ui/";
import { EmptyData, RaisedButton } from "../../../components/ui/";
import { PictureLinkIcon } from "../../../components/svg-icons/";

const b = bem("all-items-page");

export class AllItemsPage extends Component {
  static propTypes = {
    dispatch: PropTypes.func,
    boards: PropTypes.object
  };

  constructor(props, context) {
    super(props, context);
    autoBind(this);
  }

  componentDidMount() {
    this.props.dispatch(ItemActions.setItemVisibilityFilter(
      ItemVisibilityFilters.SHOW_ITEM_ALL
    ));
  }

  handleAddBoardClick() {
    this.props.dispatch(BoardActions.addBoardDialogOpen());
  }

  handleAddItemClick() {
    this.props.dispatch(ItemActions.addItemURLDialogOpen());
  }

  renderBoardEmptyData() {
    return <EmptyData
      title="No boards & items"
      icon={<PictureLinkIcon />}
      action={<RaisedButton onClick={this.handleAddBoardClick}>Add board</RaisedButton>}
    >
      アイテムがありません。<br />
      まずは新しいボードを追加しましょう。
    </EmptyData>;
  }

  renderItemEmptyData() {
    return <EmptyData
      title="No items"
      icon={<PictureLinkIcon />}
      action={<RaisedButton onClick={this.handleAddItemClick}>Add item</RaisedButton>}
    >
      アイテムがありません。<br />
      新しいアイテムを追加しましょう。
    </EmptyData>;
  }

  renderEmptyData() {
    const { boards } = this.props;

    return boards.results.length === 0
      ? this.renderBoardEmptyData()
      : this.renderItemEmptyData();
  }

  render() {
    return (
      <div className={b()}>
        <ItemsContainer
          emptyComponent={this.renderEmptyData()}
        />
      </div>
    );
  }
}

export default connect(
  state => ({
    boards: state.boards
  }),
  null,
  null,
  { pure: false }
)(AllItemsPage);
