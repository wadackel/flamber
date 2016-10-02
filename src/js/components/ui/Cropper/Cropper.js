import _ from "lodash";
import autoBind from "auto-bind";
import React, { Component } from "react";
import ReactCropper from "../../../utils/react-cropper";
import bem from "../../../helpers/bem";
import mergeClassNames from "../../../helpers/merge-class-names";
import { ProcessingOverlay } from "../";

const b = bem("cropper");

type Props = {
  className?: string;
  processing: boolean;
  zoomTo?: number;
  onClick?: Function;
  onDoubleClick?: Function;
  ready?: Function;
};

export default class Cropper extends Component {
  props: Props;

  static defaultProps = {
    zoomTo: 1,
    processing: false
  };

  constructor(props, context) {
    super(props, context);
    autoBind(this);
  }

  handleReady() {
    this.zoomTo(this.props.zoomTo);

    if (_.isFunction(this.props.ready)) {
      this.props.ready();
    }
  }

  // Methods by: https://github.com/fengyuanchen/cropperjs#methods
  crop() {
    return this.cropper.crop();
  }

  reset() {
    return this.cropper.reset();
  }

  clear() {
    return this.cropper.clear();
  }

  replace(...args) {
    return this.cropper.replace(...args);
  }

  enable() {
    return this.cropper.enable();
  }

  disable() {
    return this.cropper.disable();
  }

  destroy() {
    return this.cropper.destroy();
  }

  move(...args) {
    return this.cropper.move(...args);
  }

  moveTo(...args) {
    return this.cropper.moveTo(...args);
  }

  zoom(...args) {
    return this.cropper.zoom(...args);
  }

  zoomTo(...args) {
    return this.cropper.zoomTo(...args);
  }

  rotate(...args) {
    return this.cropper.rotate(...args);
  }

  rotateTo(...args) {
    return this.cropper.rotateTo(...args);
  }

  scale(...args) {
    return this.cropper.scale(...args);
  }

  scaleX(...args) {
    return this.cropper.scaleX(...args);
  }

  scaleY(...args) {
    return this.cropper.scaleY(...args);
  }

  getData(...args) {
    return this.cropper.getData(...args);
  }

  setData(...args) {
    return this.cropper.setData(...args);
  }

  getContainerData() {
    return this.cropper.getContainerData();
  }

  getImageData() {
    return this.cropper.getImageData();
  }

  getCanvasData() {
    return this.cropper.getCanvasData();
  }

  setCanvasData(...args) {
    return this.cropper.setCanvasData(...args);
  }

  getCropBoxData() {
    return this.cropper.getCropBoxData();
  }

  setCropBoxData(...args) {
    return this.cropper.setCropBoxData(...args);
  }

  getCroppedCanvas(...args) {
    return this.cropper.getCroppedCanvas(...args);
  }

  setAspectRatio(...args) {
    return this.cropper.setAspectRatio(...args);
  }

  setDragMode(...args) {
    return this.cropper.setDragMode(...args);
  }

  render() {
    const {
      className,
      processing,
      onClick,
      onDoubleClick,
      ready, // eslint-disable-line no-unused-vars
      ...props
    } = this.props;

    return (
      <div
        className={mergeClassNames(b(), className)}
        onClick={onClick}
        onDoubleClick={onDoubleClick}
      >
        <ProcessingOverlay
          className={b("processing-overlay", { processing })()}
          show={processing}
          spinerSize={34}
        />

        <ReactCropper
          ref={cropper => {
            this.cropper = cropper;
          }}
          className={b("cropper")()}
          ready={this.handleReady}
          {...props}
        />
      </div>
    );
  }
}
