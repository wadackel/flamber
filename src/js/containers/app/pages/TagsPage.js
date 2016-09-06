import autoBind from "auto-bind";
import React, { Component, PropTypes } from "react";
import { connect } from "react-redux";
import { push } from "react-router-redux";
import bem from "../../../helpers/bem";
import * as ItemVisibilityFilters from "../../../constants/item-visibility-filters";
import * as BoardActions from "../../../actions/boards";
import * as ItemActions from "../../../actions/items";
import * as TagActions from "../../../actions/tags";
import { getItemEntities } from "../../../selectors/items";
import { getCurrentTag } from "../../../selectors/tags";
import { ItemsContainer } from "../ui/";
import { EmptyData, RaisedButton } from "../../../components/ui/";
import { PictureLinkIcon, TagsIcon } from "../../../components/svg-icons/";

const b = bem("tags-page");

export class TagsPage extends Component {
  static propTypes = {
    dispatch: PropTypes.func,
    params: PropTypes.object,
    boards: PropTypes.object,
    rawItemEntities: PropTypes.array,
    currentTag: PropTypes.object
  };

  constructor(props, context) {
    super(props, context);
    autoBind(this);
  }

  componentDidMount() {
    const { dispatch, params } = this.props;

    dispatch(TagActions.setCurrentTag(params.id));

    dispatch(ItemActions.setItemVisibilityFilter(
      ItemVisibilityFilters.SHOW_ITEM_CURRENT_TAG
    ));
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.params.id !== nextProps.params.id) {
      this.props.dispatch(TagActions.setCurrentTag(nextProps.params.id));
    }
  }

  handleAddBoardClick() {
    this.props.dispatch(BoardActions.addBoardDialogOpen());
  }

  handleAddItemClick() {
    this.props.dispatch(ItemActions.addItemDialogOpen());
  }

  handleViewAllItemsClick() {
    this.props.dispatch(push("/app/items"));
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
      まずは新しいアイテムを追加しましょう。
    </EmptyData>;
  }

  renderItemTagEmptyData() {
    const { currentTag } = this.props;

    return <EmptyData
      title="No tag items"
      icon={<TagsIcon />}
      action={<RaisedButton onClick={this.handleViewAllItemsClick}>View all items</RaisedButton>}
    >
      「{currentTag.name}」にはアイテムがありません。<br />
      アイテムへタグを追加しましょう。
    </EmptyData>;
  }

  renderEmptyData() {
    const { boards, rawItemEntities } = this.props;

    if (boards.results.length === 0) {
      return this.renderBoardEmptyData();

    } else if (rawItemEntities.length === 0) {
      return this.renderItemEmptyData();
    }

    return this.renderItemTagEmptyData();
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
    rawItemEntities: getItemEntities(state),
    currentTag: getCurrentTag(state)
  }),
  null,
  null,
  { pure: false }
)(TagsPage);
