import React, { PropTypes } from "react";
import { unstable_renderSubtreeIntoContainer, unmountComponentAtNode } from "react-dom"; // eslint-disable-line
import bindHandlers from "../../../helpers/bind-handlers";

// inspired by: https://github.com/callemall/material-ui/blob/master/src/internal/RenderToLayer.js

function matches(el, target) {
  let node = target.parentNode;

  while (node !== null) {
    if (node === el) return true;
    node = node.parentNode;
  }

  return false;
}

export default class RenderToLayer extends React.Component {
  static propTypes = {
    componentClickAway: PropTypes.func,
    open: PropTypes.bool.isRequired,
    render: PropTypes.func.isRequired,
    useLayerForClickAway: PropTypes.bool
  };

  static defaultProps = {
    useLayerForClickAway: true
  };

  constructor(props) {
    super(props);

    bindHandlers([
      "onClickAway"
    ], this);
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

  onClickAway(event) {
    if (event.defaultPrevented) return;
    if (!this.props.componentClickAway) return;
    if (!this.props.open) return;

    const el = this.layer;
    if (event.target !== el && event.target === window ||
      (document.documentElement.contains(event.target) && !matches(el, event.target))) {
      this.props.componentClickAway(event);
    }
  }

  getLayer() {
    return this.layer;
  }

  unrenderLayer() {
    if (!this.layer) return;

    if (this.props.useLayerForClickAway) {
      this.layer.style.position = "relative";
      this.layer.removeEventListener("touchstart", this.onClickAway);
      this.layer.removeEventListener("click", this.onClickAway);
    } else {
      window.removeEventListener("touchstart", this.onClickAway);
      window.removeEventListener("click", this.onClickAway);
    }

    unmountComponentAtNode(this.layer);
    document.body.removeChild(this.layer);
    this.layer = null;
  }

  renderLayer() {
    const {
      open,
      render
    } = this.props;

    if (open) {
      if (!this.layer) {
        this.layer = document.createElement("div");
        document.body.appendChild(this.layer);

        if (this.props.useLayerForClickAway) {
          this.layer.addEventListener("touchstart", this.onClickAway);
          this.layer.addEventListener("click", this.onClickAway);
          this.layer.style.position = "fixed";
          this.layer.style.top = 0;
          this.layer.style.bottom = 0;
          this.layer.style.left = 0;
          this.layer.style.right = 0;
          this.layer.style.zIndex = 1000;
        } else {
          setTimeout(() => {
            window.addEventListener("touchstart", this.onClickAway);
            window.addEventListener("click", this.onClickAway);
          }, 0);
        }
      }

      const layerElement = render();
      this.layerElement = unstable_renderSubtreeIntoContainer(this, layerElement, this.layer);

    } else {
      this.unrenderLayer();
    }
  }

  render() {
    return null;
  }
}
