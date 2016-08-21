import autoBind from "auto-bind";
import React, { Component, PropTypes } from "react";
import MDSpinner from "react-md-spinner";
import ExecutionEnvironment from "../../../constants/execution-environment";
import bem from "../../../helpers/bem";
import mergeClassNames from "../../../helpers/merge-class-names";

const IScroll = ExecutionEnvironment.canUseDOM ? require("iscroll") : null;
const b = bem("image-viewer");

const Status = {
  LOADING: "loading",
  LOADED: "loaded",
  FAILED: "failed"
};

export default class ImageViewer extends Component {
  static propTypes = {
    className: PropTypes.string,
    style: PropTypes.object,
    zoom: PropTypes.number,
    image: PropTypes.string,
    forceFitViewport: PropTypes.bool,
    iScrollOptions: PropTypes.object,
    onZoomChange: () => {},
    onDoubleClick: () => {}
  };

  static defaultProps = {
    style: {},
    zoom: 1,
    forceFitViewport: false,
    iScrollOptions: {
      bounce: true,
      click: true,
      freeScroll: true,
      scrollX: true,
      scrollY: true,
      mouseWheel: true,
      scrollbars: "custom",
      fadeScrollbars: true
    },
    onZoomChange: () => {},
    onDoubleClick: () => {}
  };

  constructor(props, context) {
    super(props, context);

    this.state = {
      status: Status.LOADING,
      viewportWidth: 0,
      viewportHeight: 0,
      width: 0,
      height: 0,
      naturalWidth: 0,
      naturalHeight: 0
    };

    autoBind(this);
  }

  componentDidMount() {
    const { iScrollOptions, image } = this.props;
    const { viewport } = this.refs;
    const { width: viewportWidth, height: viewportHeight } = this.getViewportSize();

    this.iScroll = new IScroll(viewport, iScrollOptions);

    this.setState({ viewportWidth, viewportHeight });
    this.updateImage(image);
  }

  componentWillReceiveProps(nextProps) {
    const {
      image,
      forceFitViewport,
      zoom
    } = this.props;

    const {
      image: _image,
      forceFitViewport: _forceFitViewport,
      zoom: _zoom
    } = nextProps;

    // Image
    if (image !== _image) {
      this.updateImage(_image);
    }

    // Force fit viewport
    if (forceFitViewport !== _forceFitViewport && _forceFitViewport) {
      const { width: dw, height: dh, naturalWidth } = this.state;
      const { width } = this.normalizeImageSize(dw, dh);
      this.updateImageSizeByZoom(width / naturalWidth);
    }

    // Zoom
    if (zoom !== _zoom) {
      this.updateImageSizeByZoom(_zoom);
    }
  }

  componentDidUpdate() {
    const { viewportWidth, viewportHeight } = this.state;
    const { width, height } = this.getViewportSize();

    if (viewportWidth !== width || viewportHeight !== height) {
      this.setState({ viewportWidth: width, viewportHeight: height });
    }
  }

  componentWillUnmount() {
    if (this.iScroll) {
      this.iScroll.destroy();
      this.iScroll = null;
    }
  }

  handleDoubleClick(e) {
    e.preventDefault();
    e.stopPropagation();
    this.props.onDoubleClick(e);
  }

  getViewportSize() {
    const { width, height } = this.refs.viewport.getBoundingClientRect();
    return { width, height };
  }

  loadImage(src) {
    return new Promise((resolve, reject) => {
      const img = new Image();

      img.onload = () => resolve(img);
      img.onerror = reject;
      img.src = src;
    });
  }

  getImageSize(img) {
    const { width, height, naturalWidth, naturalHeight } = img;
    return { width, height, naturalWidth, naturalHeight };
  }

  updateImage(src) {
    this.setState({ status: Status.LOADING });

    this.loadImage(src)
      .then(img => {
        const size = this.getImageSize(img);

        this.setState({ status: Status.LOADED });
        this.setImageSize(
          size.width,
          size.height,
          size.naturalWidth,
          size.naturalHeight,
          false
        );
      })
      .catch(() => {
        this.setState({ status: Status.FAILED });
      });
  }

  updateImageSizeByZoom(zoom, adjustScrollPosition = true) {
    const { status } = this.state;

    if (status !== Status.LOADED) {
      return;
    }

    const { zoom: prevZoom } = this.props;
    const { naturalWidth, naturalHeight } = this.state;

    this.setImageSize(
      naturalWidth * zoom,
      naturalHeight * zoom,
      naturalWidth,
      naturalHeight,
      adjustScrollPosition
    );

    if (zoom !== prevZoom) {
      this.props.onZoomChange(zoom);
    }
  }

  normalizeImageSize(dw, dh) {
    const { width: vw, height: vh } = this.getViewportSize();
    const vRatio = vw / vh;
    const dRatio = dw / dh;
    const ratio = vRatio > dRatio ? vh / dh : vw / dw;

    return {
      width: dw * ratio,
      height: dh * ratio
    };
  }

  setImageSize(width, height, naturalWidth, naturalHeight, adjustScrollPosition = true) {
    if (adjustScrollPosition) {
      const { width: w, height: h } = this.state;

      this.iScroll.scrollBy(
        (w - width) / 2,
        (h - height) / 2,
        0
      );
    }

    this.setState({
      width,
      height,
      naturalWidth,
      naturalHeight
    }, () => {
      this.iScroll.refresh();
    });
  }

  refresh() {
    if (this.iScroll) {
      this.iScroll.refresh();
    }
  }

  render() {
    const {
      className,
      style,
      image
    } = this.props;

    const {
      status,
      viewportWidth,
      viewportHeight,
      width,
      height
    } = this.state;

    const bodyStyle = {
      width: Math.max(viewportWidth, width),
      height: Math.max(viewportHeight, height)
    };

    const holderStyle = {
      width,
      height,
      marginLeft: Math.max(0, (viewportWidth - width) / 2)
    };

    // TODO: Failed render

    return (
      <div
        ref="viewport"
        className={mergeClassNames(b(), className)}
        style={style}
      >
        <div
          className={b("body")()}
          style={bodyStyle}
        >
          {status === Status.LOADING &&
            <MDSpinner
              className={b("spinner")()}
            />
          }
          {status === Status.LOADED &&
            <div
              className={b("holder")()}
              style={holderStyle}
            >
              <img
                className={b("image")()}
                src={image}
                onDoubleClick={this.handleDoubleClick}
              />
            </div>
          }
        </div>
      </div>
    );
  }
}
