// @flow
import autoBind from "auto-bind";
import { Component } from "react";
import { unstable_renderSubtreeIntoContainer, unmountComponentAtNode } from "react-dom"; // eslint-disable-line
import elementClosest from "../../../utils/element-closest";


// inspired by: https://github.com/callemall/material-ui/blob/master/src/internal/RenderToLayer.js
type Props = {
  componentClickAway?: Function;
  open: boolean;
  render: Function;
  useLayerForClickAway: boolean;
};

export default class RenderToLayer extends Component {
  props: Props;

  static defaultProps = {
    useLayerForClickAway: true
  };

  layer: ?HTMLElement = null;
  layerElement: ?React$Component<*, *, *> = null;

  constructor(props: Props, context: Object) {
    super(props, context);
    autoBind(this);
  }

  componentDidMount() {
    this.renderLayer();
  }

  componentDidUpdate() {
    this.renderLayer();
  }

  componentWillUnmount() {
    this.unrenderLayer();
  }

  onClickAway(e: Event) {
    if (e.defaultPrevented) return;
    if (!this.props.componentClickAway) return;
    if (!this.props.open) return;
    if (this.layer == null) return;

    const el = this.layer;

    if (
      e.target !== el &&
      e.target === window ||
      (
        e.target instanceof HTMLElement &&
        document.documentElement.contains(e.target) &&
        !elementClosest(el, e.target)
      )
    ) {
      this.props.componentClickAway(e);
    }
  }

  getLayer(): ?HTMLElement {
    return this.layer;
  }

  unrenderLayer(): void {
    if (!this.layer) return;

    if (this.props.useLayerForClickAway) {
      this.layer.style.position = "relative";
      if (this.layer) this.layer.removeEventListener("touchstart", this.onClickAway, false);
      if (this.layer) this.layer.removeEventListener("click", this.onClickAway, false);
    } else {
      window.removeEventListener("touchstart", this.onClickAway, false);
      window.removeEventListener("click", this.onClickAway, false);
    }

    unmountComponentAtNode(this.layer);

    if (this.layer != null) {
      document.body.removeChild(this.layer);
    }

    this.layer = null;
  }

  renderLayer(): void {
    const {
      open,
      render
    } = this.props;

    if (open) {
      if (!this.layer) {
        this.layer = document.createElement("div");
        this.layer.style.position = "fixed";
        this.layer.style.top = "0";
        this.layer.style.left = "0";
        this.layer.style.zIndex = "1520";

        document.body.appendChild(this.layer);

        if (this.props.useLayerForClickAway) {
          if (this.layer) {
            this.layer.style.bottom = "0";
            this.layer.style.right = "0";
          }
          if (this.layer) this.layer.addEventListener("touchstart", this.onClickAway, false);
          if (this.layer) this.layer.addEventListener("click", this.onClickAway, false);
        } else {
          setTimeout(() => {
            window.addEventListener("touchstart", this.onClickAway, false);
            window.addEventListener("click", this.onClickAway, false);
          }, 0);
        }
      }

      this.layerElement = unstable_renderSubtreeIntoContainer(this, render(), this.layer);

    } else {
      this.unrenderLayer();
    }
  }

  render() {
    return null;
  }
}
