import autoBind from "auto-bind";
import React, { Component, PropTypes } from "react";
import { connect } from "react-redux";
import { push } from "react-router-redux";
import bem from "../../../helpers/bem";
import * as ItemVisibilityFilters from "../../../constants/item-visibility-filters";
import * as BoardActions from "../../../actions/boards";
import * as ItemActions from "../../../actions/items";
import { getItemEntities } from "../../../selectors/items";
import { ItemsContainer } from "../ui/";
import { EmptyData, RaisedButton } from "../../../components/ui/";
import { StarIcon } from "../../../components/svg-icons/";

const b = bem("stars-page");

export class StarsPage extends Component {
  static propTypes = {
    dispatch: PropTypes.func,
    boards: PropTypes.object,
    rawItemEntities: PropTypes.array
  };

  constructor(props, context) {
    super(props, context);
    autoBind(this);
  }

  componentDidMount() {
    this.props.dispatch(ItemActions.setItemVisibilityFilter(
      ItemVisibilityFilters.SHOW_ITEM_STAR
    ));
  }

  componentWillUnmount() {
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

  handleViewAllItemsClick() {
    this.props.dispatch(push("/app/items"));
  }

  renderBoardEmptyData() {
    return <EmptyData
      title="No boards & starred items"
      icon={<StarIcon />}
      action={<RaisedButton onClick={this.handleAddBoardClick}>Add board</RaisedButton>}
    >
      スター付きのアイテムがありません。<br />
      まずは新しいボードを追加しましょう。
    </EmptyData>;
  }

  renderItemEmptyData() {
    return <EmptyData
      title="No stared items"
      icon={<StarIcon />}
      action={<RaisedButton onClick={this.handleAddItemClick}>Add item</RaisedButton>}
    >
      スター付きのアイテムがありません。<br />
      まずは新しいアイテムを追加しましょう。
    </EmptyData>;
  }

  renderStarItemEmptyData() {
    return <EmptyData
      title="No starred items"
      icon={<StarIcon />}
      action={<RaisedButton onClick={this.handleViewAllItemsClick}>View all items</RaisedButton>}
    >
      スター付きのアイテムがありません。<br />
      お気に入りのアイテムにスターを付けましょう。
    </EmptyData>;
  }

  renderEmptyData() {
    const { boards, rawItemEntities } = this.props;

    if (boards.results.length === 0) {
      return this.renderBoardEmptyData();

    } else if (rawItemEntities.length === 0) {
      return this.renderItemEmptyData();
    }

    return this.renderStarItemEmptyData();
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
    boards: state.boards,
    rawItemEntities: getItemEntities(state)
  }),
  null,
  null,
  { pure: false }
)(StarsPage);
