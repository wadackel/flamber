import imagesLoaded from "imagesloaded";
import React, { PropTypes } from "react";
import bindHandlers from "../../../helpers/bind-handlers";

const Status = {
  LOADING: "LOADING",
  LOADED: "LOADED",
  FAILED: "FAILED"
};

export default class ImageLoader extends React.Component {
  static propTypes = {
    children: PropTypes.node,
    tag: PropTypes.string,
    background: PropTypes.bool,
    preloader: PropTypes.node,
    onError: PropTypes.func,
    onLoad: PropTypes.func
  };

  static defaultProps = {
    tag: "span",
    onError: () => {},
    onLoad: () => {}
  };

  constructor(props) {
    super(props);

    this.state = { status: Status.LOADING };

    bindHandlers([
      "handleLoaded",
      "handleFail"
    ], this);
  }

  componentDidMount() {
    this.createImgLoad();
  }

  componentWillUnmount() {
    this.destroyImgLoad();
  }

  handleLoaded() {
    this.destroyImgLoad();
    this.setState({ status: Status.LOADED });
    this.props.onLoad();
  }

  handleFail() {
    this.destroyImgLoad();
    this.setState({ status: Status.FAILED });
    this.props.onError();
  }

  createImgLoad() {
    const { background } = this.props;

    this.destroyImgLoad();
    this.imgLoad = imagesLoaded(this.refs.imageLoader, { background });
    this.imgLoad.on("done", this.handleLoaded);
    this.imgLoad.on("fail", this.handleFail);
  }

  destroyImgLoad() {
    if (this.imgLoad) {
      this.imgLoad.off("done", this.handleLoaded);
      this.imgLoad.off("fail", this.handleFail);
      this.imgLoad = null;
    }
  }

  render() {
    const {
      children,
      tag,
      preloader
    } = this.props;

    const { status } = this.state;

    return React.createElement(tag, {
      ref: "imageLoader"
    }, status === "LOADED" ? children : preloader);
  }
}
