// @flow
import autoBind from "auto-bind";
import React, { Component } from "react";
import bem from "../../../../helpers/bem";
import mergeClassNames from "../../../../helpers/merge-class-names";
import prefixer from "../../../../helpers/prefixer";
import { IconButton } from "../../";
import { MoreVertIcon } from "../../../svg-icons";

type Props = {
  className?: string;
  baseClassName: string;
  actions: React$Element<any>;
  selected: boolean;
};

type State = {
  show: boolean;
};

export default class CardMore extends Component {
  props: Props;
  state: State;

  static defaultProps = {
    selected: false
  };

  constructor(props: Props, context: Object) {
    super(props, context);

    this.state = { show: false };

    autoBind(this);
  }

  handleMouseLeave() {
    this.setState({ show: false });
  }

  handleMouseEnter(e: SyntheticMouseEvent) {
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
