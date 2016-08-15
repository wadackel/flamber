import React, { PropTypes } from "react";
import bem from "../../../../helpers/bem";
import bindHandlers from "../../../../helpers/bind-handlers";
import { Checkbox } from "../../";
import { CardMore } from "./";

export default class CardOverlay extends React.Component {
  static propTypes = {
    baseClassName: PropTypes.string,
    style: PropTypes.object,
    actions: PropTypes.node,
    moreActions: PropTypes.node,
    selectable: PropTypes.bool,
    selected: PropTypes.bool,
    onSelect: PropTypes.func
  };

  static defaultProps = {
    style: {},
    selectable: false,
    selected: false,
    onSelect: () => {}
  };

  constructor(props, context) {
    super(props, context);

    this.state = { show: false };

    bindHandlers([
      "handleMouseEnter",
      "handleMouseLeave",
      "handleMouseMove"
    ], this);
  }

  handleMouseEnter() {
    this.setState({ show: true });
  }

  handleMouseLeave() {
    this.setState({ show: false });
  }

  handleMouseMove() {
    if (this.state.show === false) {
      this.setState({ show: true });
    }
  }

  render() {
    const {
      baseClassName,
      style,
      actions,
      moreActions,
      selectable,
      selected,
      onSelect
    } = this.props;

    const { show } = this.state;

    const b = bem(`${baseClassName.trim()}__overlay`);

    const modifier = {
      show,
      selectable,
      selected
    };

    const moreElement = moreActions && <CardMore
      baseClassName={baseClassName}
      className={b("more", modifier)}
      actions={moreActions}
      selected={selected}
    />;

    const selectElement = selectable && <Checkbox
      className={b("select", modifier)}
      checked={selected}
      onCheck={onSelect}
    />;

    const actionElements = actions && <div className={b("actions", modifier)}>
      {React.Children.map(actions, (action, index) =>
        React.cloneElement(action, {
          key: index,
          className: b("action")
        })
      )}
    </div>;

    return (
      <div
        className={b(modifier)}
        style={style}
        onMouseEnter={this.handleMouseEnter}
        onMouseLeave={this.handleMouseLeave}
        onMouseMove={this.handleMouseMove}
      >
        {selectElement}
        {moreElement}
        <div className={b("inner", modifier)}>
          {actionElements}
        </div>
      </div>
    );
  }
}
