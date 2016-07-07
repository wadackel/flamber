import React, { PropTypes } from "react";
import bem from "../../../../helpers/bem";
import { Checkbox } from "../../";
import { CardMore } from "./";

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

    const modifier = {
      show,
      selectable,
      selected
    };

    const moreElement = moreActions && <CardMore
      baseClassName={baseClassName}
      className={b("more")}
      actions={moreActions}
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
        {moreElement}
        <div className={b("inner")}>
          {actionElements}
        </div>
      </div>
    );
  }
}
