import autoBind from "auto-bind";
import React, { Component, PropTypes, isValidElement } from "react";
import ReactCSSTransitionGroup from "react-addons-css-transition-group";
import shareConfig from "../../../../share-config.json";
import bem from "../../../helpers/bem";
import mergeClassNames from "../../../helpers/merge-class-names";

const b = bem("selectable-color-group");

export default class SelectableColorGroup extends Component {
  static propTypes = {
    children: PropTypes.node,
    className: PropTypes.string,
    selectColors: PropTypes.arrayOf(PropTypes.string),
    onColorClick: PropTypes.func
  };

  static defaultProps = {
    selectColors: [],
    onColorClick: () => {}
  };

  constructor(props, context) {
    super(props, context);
    autoBind(this);
  }

  handleColorClick(e, color) {
    this.props.onColorClick(color);
  }

  renderColors() {
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
