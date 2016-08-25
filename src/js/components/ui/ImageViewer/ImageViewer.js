import _ from "lodash";
import autoBind from "auto-bind";
import React, { Component, PropTypes } from "react";
import SizeMe from "react-sizeme";
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

class ImageViewerInline extends Component {
  static propTypes = {
    className: PropTypes.string,
    style: PropTypes.object,
    size: PropTypes.shape({
      width: PropTypes.number,
      height: PropTypes.number
    }),
    zoom: PropTypes.number,
    image: PropTypes.string,
    forceFitViewport: PropTypes.bool,
    iScrollOptions: PropTypes.object,
    onZoomChange: () => {},
    onBodyClick: () => {},
    onClick: () => {},
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
    onBodyClick: () => {},
    onClick: () => {},
    onDoubleClick: () => {}
  };

  constructor(props, context) {
    super(props, context);

    this._isMounted = false;
    this.state = {
      status: Status.LOADING,
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

    this.iScroll = new IScroll(viewport, iScrollOptions);

    this.updateImage(image);
    this._isMounted = true;
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

  componentDidUpdate(prevProps) {
    if (!_.isEqual(this.props.size, prevProps.size)) {
      this.refresh();
    }
  }

  componentWillUnmount() {
    this._isMounted = false;

    if (this.iScroll) {
      this.iScroll.destroy();
      this.iScroll = null;
    }
  }

  handleClick(e) {
    e.preventDefault();
    e.stopPropagation();
    this.props.onClick(e);
  }

  handleDoubleClick(e) {
    e.preventDefault();
    e.stopPropagation();
    this.props.onDoubleClick(e);
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
        const { zoom } = this.props;
        const size = this.getImageSize(img);

        if (!this._isMounted) return;

        this.setState({ status: Status.LOADED });

        this.setImageSize(
          size.width * zoom,
          size.height * zoom,
          size.naturalWidth,
          size.naturalHeight,
          false
        );
      })
      .catch(() => {
        if (!this._isMounted) return;
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
    const { size } = this.props;
    const vRatio = size.width / size.height;
    const dRatio = dw / dh;
    const ratio = vRatio > dRatio ? size.height / dh : size.width / dw;

    return {
      width: dw * ratio,
      height: dh * ratio
    };
  }

  setImageSize(width, height, naturalWidth, naturalHeight, adjustScrollPosition = true) {
    if (!this._isMounted) return;

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
      size,
      image,
      onBodyClick
    } = this.props;

    const {
      status,
      width,
      height
    } = this.state;

    const bodyStyle = {
      width: Math.max(size.width, width),
      height: Math.max(size.height, height)
    };

    const holderStyle = {
      width,
      height,
      marginTop: Math.max(0, (size.height - height) / 2),
      marginLeft: Math.max(0, (size.width - width) / 2)
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
          onClick={onBodyClick}
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
                onClick={this.handleClick}
                onDoubleClick={this.handleDoubleClick}
              />
            </div>
          }
        </div>
      </div>
    );
  }
}

const SizeAwareImageViewer = SizeMe({ monitorHeight: true })(ImageViewerInline);

export default function ImageViewer(props) {
  return <SizeAwareImageViewer {...props} />;
}
