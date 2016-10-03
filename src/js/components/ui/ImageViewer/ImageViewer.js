// @flow
import _ from "lodash";
import autoBind from "auto-bind";
import React, { Component } from "react";
import sizeMe from "react-sizeMe";
import IScroll from "../../../utils/iscroll";
import bem from "../../../helpers/bem";
import mergeClassNames from "../../../helpers/merge-class-names";
import { Spinner } from "../";
import type { Size } from "../../../types/prop-types";

const b = bem("image-viewer");

const Status = {
  LOADING: "loading",
  LOADED: "loaded",
  FAILED: "failed"
};

type ImageSize = {
  width: number;
  height: number;
  naturalWidth: number;
  naturalHeight: number;
};

type Props = {
  className?: string;
  style?: Object;
  size: Size;
  zoom: number;
  image: string;
  forceFitViewport: boolean;
  iScrollOptions: Object;
  onZoomChange?: Function;
  onBodyClick?: Function;
  onClick?: Function;
  onDoubleClick?: Function;
};

type State = $All<ImageSize, {
  status: "loading" | "loaded" | "failed";
}>;

class ImageViewerInline extends Component {
  props: Props;
  state: State;

  static defaultProps = {
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
    }
  };

  _isMounted: boolean = false;
  iScroll: ?IScroll = null;

  constructor(props: Props, context: Object) {
    super(props, context);

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

  componentWillReceiveProps(nextProps: Props) {
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

  componentDidUpdate(prevProps: Props) {
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

  handleClick(e: SyntheticMouseEvent) {
    e.preventDefault();
    e.stopPropagation();
    if (typeof this.props.onClick === "function") {
      this.props.onClick(e);
    }
  }

  handleDoubleClick(e: SyntheticMouseEvent) {
    e.preventDefault();
    e.stopPropagation();
    if (typeof this.props.onDoubleClick === "function") {
      this.props.onDoubleClick(e);
    }
  }

  loadImage(src: string): Promise<Image> {
    return new Promise((resolve, reject) => {
      const img = new Image();

      img.onload = () => resolve(img);
      img.onerror = reject;
      img.src = src;
    });
  }

  getImageSize(img: Image): ImageSize {
    const { width, height, naturalWidth, naturalHeight } = img;
    return { width, height, naturalWidth, naturalHeight };
  }

  updateImage(src: string): void {
    this.setState({ status: Status.LOADING });

    this.loadImage(src)
      .then(img => {
        const { zoom } = this.props;
        const size = this.getImageSize(img);

        if (!this._isMounted) return;

        this.setState({ status: Status.LOADED });

        this.setImageSize({
          width: size.width * zoom,
          height: size.height * zoom,
          naturalWidth: size.naturalWidth,
          naturalHeight: size.naturalHeight
        }, false);
      })
      .catch(() => {
        if (!this._isMounted) return;
        this.setState({ status: Status.FAILED });
      });
  }

  updateImageSizeByZoom(zoom: number, adjustScrollPosition: boolean = true): void {
    const { status } = this.state;

    if (status !== Status.LOADED) {
      return;
    }

    const { zoom: prevZoom } = this.props;
    const { naturalWidth, naturalHeight } = this.state;

    this.setImageSize({
      width: naturalWidth * zoom,
      height: naturalHeight * zoom,
      naturalWidth,
      naturalHeight
    }, adjustScrollPosition);

    if (zoom !== prevZoom && typeof this.props.onZoomChange === "function") {
      this.props.onZoomChange(zoom);
    }
  }

  normalizeImageSize(dw: number, dh: number): Size {
    const { size } = this.props;
    const vRatio = size.width / size.height;
    const dRatio = dw / dh;
    const ratio = vRatio > dRatio ? size.height / dh : size.width / dw;

    return {
      width: dw * ratio,
      height: dh * ratio
    };
  }

  setImageSize(imageSize: ImageSize, adjustScrollPosition: boolean = true): void {
    if (!this._isMounted) return;

    const {
      width,
      height,
      naturalWidth,
      naturalHeight
    } = imageSize;

    if (adjustScrollPosition) {
      const { width: w, height: h } = this.state;

      if (this.iScroll) {
        this.iScroll.scrollBy(
          (w - width) / 2,
          (h - height) / 2,
          0
        );
      }
    }

    this.setState({
      width,
      height,
      naturalWidth,
      naturalHeight
    }, () => {
      if (!this.iScroll) return;
      this.iScroll.refresh();
    });
  }

  refresh(): void {
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
            <Spinner className={b("spinner")()} />
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

const SizeAwareImageViewer = sizeMe({ monitorHeight: true })(ImageViewerInline);

export default function ImageViewer(props: Props) {
  return <SizeAwareImageViewer {...props} />;
}
