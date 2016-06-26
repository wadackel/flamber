import assign from "object-assign";
import React, { PropTypes } from "react";
import bem from "../../../../helpers/bem";
import bindHandlers from "../../../../helpers/bind-handlers";
import { Checkbox, IconButton } from "../../";
import { MoreVertIcon } from "../../../svg-icons";

export default class CardOverlay extends React.Component {
  static propTypes = {
    baseClassName: PropTypes.string,
    style: PropTypes.object,
    show: PropTypes.bool,
    actions: PropTypes.node,
    moreActions: PropTypes.node,
    selectable: PropTypes.bool,
    selected: PropTypes.bool,
    onSelect: PropTypes.func
  };

  static defaultProps = {
    style: {},
    show: false,
    selectable: false,
    selected: false,
    onSelect: () => {}
  };

  constructor(props) {
    super(props);

    this.state = { moreActionsShow: false };

    bindHandlers([
      "handleMoreClick",
      "handleMoreActionsMouseLeave"
    ], this);
  }

  handleMoreActionsMouseLeave() {
    this.setState({ moreActionsShow: false });
  }

  handleMoreClick(e) {
    e.preventDefault();
    e.stopPropagation();
    this.setState({ moreActionsShow: true });
  }

  render() {
    const {
      baseClassName,
      style,
      show,
      actions,
      moreActions,
      selectable,
      selected,
      onSelect
    } = this.props;

    const b = bem(`${baseClassName.trim()}__overlay`);

    const { moreActionsShow } = this.state;

    const modifier = {
      show,
      selectable,
      selected
    };

    const moreActionModifier = assign({}, modifier, {
      show: moreActionsShow
    });

    const moreActionElements = moreActions && <div
      className={b("more-actions", moreActionModifier)}
      onMouseLeave={this.handleMoreActionsMouseLeave}
    >
      {React.Children.map(moreActions, (action, index) =>
        React.cloneElement(action, {
          key: index,
          className: b("more-action", modifier)
        })
      )}
    </div>;

    const moreVertElement = moreActions && <IconButton
      className={b("more", moreActionModifier)}
      icon={<MoreVertIcon />}
      onClick={this.handleMoreClick}
    />;

    const selectElement = selectable && <Checkbox
      className={b("select", modifier)}
      checked={selected}
      onCheck={onSelect}
    />;

    const actionElements = actions && <div className={b("actions")}>
      {React.Children.map(actions, (action, index) =>
        React.cloneElement(action, {
          key: index,
          className: b("action")
        })
      )}
    </div>;

    return (
      <div className={b(modifier)} style={style}>
        {selectElement}
        {moreVertElement}
        {moreActionElements}
        <div className={b("inner")}>
          {actionElements}
        </div>
      </div>
    );
  }
}
