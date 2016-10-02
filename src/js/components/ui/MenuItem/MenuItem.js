// @flow
import React from "react";
import bem from "../../../helpers/bem";
import mergeClassNames from "../../../helpers/merge-class-names";
import { ListItem } from "../";

const b = bem("menu-item");

type Props = {
  className?: string;
  style?: Object;
  primary: string;
  icon: React$Element<any>;
  index?: number;
  value?: any;
  selected: boolean;
  focused: boolean;
  onClick?: Function;
};

export default class MenuItem extends React.Component {
  props: Props;

  static defaultProps = {
    selected: false,
    focused: false
  }

  componentDidMount() {
    this.applyFocus();
  }

  componentDidUpdate() {
    this.applyFocus();
  }

  applyFocus() {
    if (this.props.focused) {
      this.refs.listItem.applyFocus();
    }
  }

  render() {
    const {
      className,
      selected, // eslint-disable-line no-unused-vars
      focused, // eslint-disable-line no-unused-vars
      ...props
    } = this.props;

    return <ListItem
      {...props}
      ref="listItem"
      className={mergeClassNames(b({ selected, focused })(), className)}
      editable={false}
    />;
  }
}
