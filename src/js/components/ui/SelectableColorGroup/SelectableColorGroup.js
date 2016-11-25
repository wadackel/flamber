// @flow
import React, { Component, isValidElement } from "react";
import ReactCSSTransitionGroup from "react-addons-css-transition-group";
import shareConfig from "../../../share-config.json";
import bem from "../../../helpers/bem";
import mergeClassNames from "../../../helpers/merge-class-names";

const b = bem("selectable-color-group");

type Props = {
  children?: React$Element<any>;
  className?: string;
  selectColors: Array<string>;
  onColorClick?: Function;
};

export default class SelectableColorGroup extends Component {
  props: Props;

  static defaultProps = {
    selectColors: []
  };

  handleColorClick = (e: SyntheticMouseEvent, color: string) => {
    if (typeof this.props.onColorClick === "function") {
      this.props.onColorClick(color);
    }
  }

  renderColors(): React$Element<any> {
    const { children, selectColors } = this.props;
    const childArray = React.Children.toArray(children);
    const validChildren = childArray.filter(child =>
      isValidElement(child) && child.type.name === "SelectableColor"
    );

    return validChildren.map((child, index) =>
      <div
        key={child.props.color}
        className={b("color")()}
        style={{ transitionDelay: `${index * 15}ms` }}
      >
        {React.cloneElement(child, {
          selected: selectColors.indexOf(child.props.color) > -1,
          onClick: this.handleColorClick
        })}
      </div>
    );
  }

  render() {
    const { className } = this.props;

    return (
      <div className={mergeClassNames(b(), className)}>
        <ReactCSSTransitionGroup
          transitionName="color"
          transitionAppear={true}
          transitionAppearTimeout={shareConfig["selectable-color-enter-duration"]}
          transitionEnterTimeout={shareConfig["selectable-color-enter-duration"]}
          transitionLeaveTimeout={shareConfig["selectable-color-leave-duration"]}
        >
          {this.renderColors()}
        </ReactCSSTransitionGroup>
      </div>
    );
  }
}
