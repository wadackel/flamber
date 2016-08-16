import autoBind from "auto-bind";
import React, { Component, PropTypes } from "react";
import bem from "../../../../helpers/bem";
import mergeClassNames from "../../../../helpers/merge-class-names";
import prefixer from "../../../../helpers/prefixer";
import { IconButton } from "../../";
import { MoreVertIcon } from "../../../svg-icons";

export default class CardMore extends Component {
  static propTypes = {
    baseClassName: PropTypes.string,
    className: PropTypes.string,
    actions: PropTypes.node,
    selected: PropTypes.bool
  };

  static defaultProps = {
    selected: false
  };

  constructor(props, context) {
    super(props, context);

    this.state = { show: false };

    autoBind(this);
  }

  handleMouseLeave() {
    this.setState({ show: false });
  }

  handleMouseEnter(e) {
    e.preventDefault();
    e.stopPropagation();
    this.setState({ show: true });
  }

  render() {
    const {
      baseClassName,
      className,
      actions,
      selected
    } = this.props;

    const { show } = this.state;

    const modifier = { show, selected };
    const b = bem(`${baseClassName}__more`);

    const actionArray = React.Children.toArray(actions);
    const actionElements = actionArray.map((action, index) =>
      React.cloneElement(action, {
        key: index,
        className: b("action", modifier)(),
        style: prefixer.prefix({
          transitionDuration: `${(actionArray.length - (index + 1)) * 300}ms`
        })
      })
    );

    return (
      <div className={mergeClassNames(b(modifier)(), className)} onMouseLeave={this.handleMouseLeave}>
        <div className={b("actions", modifier)()}>
          {actionElements}
        </div>
        <IconButton
          className={b("trigger", modifier)()}
          icon={<MoreVertIcon />}
          onMouseEnter={this.handleMouseEnter}
        />
      </div>
    );
  }
}
