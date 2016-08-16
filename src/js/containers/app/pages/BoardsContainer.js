/* eslint-disable */
import autoBind from "auto-bind";
import React, { Component, PropTypes } from "react";
import { connect } from "react-redux";
import { push } from "react-router-redux";
import bem from "../../../helpers/bem";
import * as OrderBy from "../../../constants/order-by";
import * as SettingActions from "../../../actions/settings";
import * as BoardActions from "../../../actions/boards";
import { getBoardEntities, getSelectedBoardEntities } from "../../../selectors/boards";
import { TrashIcon } from "../../../components/svg-icons/";
import {
  CardGroup,
  BoardCard,
  IconButton,
  ToolBox,
  SortSwitcher
} from "../../../components/ui/";

const b = bem("boards");

export class BoardsContainer extends Component {
  static propTypes = {
  };

  static defaultProps = {
  };

  constructor(props, context) {
    super(props, context);
    autoBind(this);
  }

  handleEdit(id) {
    this.props.dispatch(push(`/app/board/${id}`));
  }

  handleSelect(id) {
    this.props.dispatch(BoardActions.selectBoardToggle(id));
  }

  handleDelete(id) {
    this.props.dispatch(BoardActions.deleteBoardRequest(id));
  }

  handleSelectDelete() {
    this.props.dispatch(BoardActions.selectedBoardsDeleteRequest());
  }

  handleOrderByChange(orderBy) {
    this.props.dispatch(SettingActions.updateBoardsOrderByRequest(orderBy));
  }

  handleOrderChange(order) {
    this.props.dispatch(SettingActions.updateBoardsOrderRequest(order));
  }

  render() {
    const {
      settings: {
        boardsLayout,
        boardsOrderBy,
        boardsOrder
      },
      boards,
      boardEntities,
      selectedBoardEntities,
      itemEntities
    } = this.props;

    const hasSelectedBoard = selectedBoardEntities.length > 0;

    return (
      <div className={`container ${b()}`}>
        <div className={b("control")()}>
          <SortSwitcher
            className={b("sort-switcher")()}
            orderBy={boardsOrderBy}
            order={boardsOrder}
            types={[
              { name: "名前", value: OrderBy.NAME },
              { name: "作成", value: OrderBy.CREATED },
              { name: "最終編集", value: OrderBy.MODIFIED }
            ]}
            onOrderByChange={this.handleOrderByChange}
            onOrderChange={this.handleOrderChange}
          />
        </div>

        <CardGroup
          columnWidth={300}
          gutter={30}
          layout={boardsLayout}
        >
          {boardEntities.map(board => {
            const firstItem = board.items.length > 0 ? itemEntities[board.items[0]] : null;

            return <BoardCard
              key={board.id}
              id={board.id}
              processing={board.isDeleting}
              selected={board.select}
              title={board.name}
              image={firstItem ? firstItem.thumbnail : "/images/default.png"}
              layout={boardsLayout}
              itemCount={board.items.length}
              lastModified={new Date(board.modified)}
              onEdit={this.handleEdit}
              onSelect={this.handleSelect}
              onDelete={this.handleDelete}
            />
          })}
        </CardGroup>

        <ToolBox
          open={hasSelectedBoard}
          text={`${selectedBoardEntities.length}個のボード`}
          actions={[
            <IconButton
              type="primary"
              tooltip="削除"
              icon={<TrashIcon />}
              onClick={this.handleSelectDelete}
            />
          ]}
        />
      </div>
    );
  }
}

export default connect(
  state => {
    const { boardsOrder, boardsOrderBy } = state.settings;

    return {
      settings: state.settings,
      boards: state.boards,
      boardEntities: getBoardEntities(state, boardsOrderBy, boardsOrder),
      selectedBoardEntities: getSelectedBoardEntities(state),
      itemEntities: state.entities.items
    };
  },
  null,
  null,
  { pure: false }
)(BoardsContainer);
