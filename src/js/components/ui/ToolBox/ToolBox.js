// @flow
import _ from "lodash";
import autoBind from "auto-bind";
import React, { Component } from "react";
import ReactCSSTransitionGroup from "react-addons-css-transition-group";
import shareConfig from "../../../share-config.json";
import bem from "../../../helpers/bem";
import mergeClassNames from "../../../helpers/merge-class-names";
import FirstChild from "../internal/FirstChild";
import RenderToLayer from "../internal/RenderToLayer";

const b = bem("tool-box");

type Props = {
  className?: string;
  open: boolean;
  text: React$Element<any>;
  actions: Array<React$Element<any>>;
};

export default class ToolBox extends Component {
  props: Props;

  static defaultProps = {
    open: false,
    text: "",
    actions: []
  };

  constructor(props: Props, context: Object) {
    super(props, context);
    autoBind(this);
  }

  shouldComponentUpdate(nextProps: Props) {
    return !_.isEqual(this.props, nextProps);
  }

  renderBox() {
    const { className, open, text, actions } = this.props;
    const modifier = { open };

    if (!open) return null;

    return (
      <div className={mergeClassNames(b(modifier)(), className)}>
        <div className={b("inner", modifier)()}>
          <div className={b("body", modifier)()}>
            <div className={b("text", modifier)()}>{text}</div>
            <ul className={b("actions", modifier)()}>
              {actions.map((action, index) =>
                <li key={index} className={b("action")()}>{action}</li>
              )}
            </ul>
          </div>
        </div>
      </div>
    );
  }

  renderLayer() {
    return (
      <div>
        <ReactCSSTransitionGroup
          component={FirstChild}
          transitionName="open"
          transitionEnterTimeout={shareConfig["tool-box-enter-duration"]}
          transitionLeaveTimeout={shareConfig["tool-box-leave-duration"]}
        >
          {this.renderBox()}
        </ReactCSSTransitionGroup>
      </div>
    );
  }

  render() {
    return <RenderToLayer
      render={this.renderLayer}
      open={true}
      useLayerForClickAway={false}
    />;
  }
}
