import React, { Component, PropTypes } from "react";
import ExecutionEnvironment from "../../../constants/execution-environment";
const ReactCropper = ExecutionEnvironment.canUseDOM
  ? require("react-cropper").default
  : function ReactCropper() { return null }; // eslint-disable-line
import bem from "../../../helpers/bem";
import mergeClassNames from "../../../helpers/merge-class-names";
import { ProcessingOverlay } from "../";

const b = bem("cropper");

export default class Cropper extends Component {
  static propTypes = {
    className: PropTypes.string,
    processing: PropTypes.bool,
    onClick: PropTypes.func,
    onDoubleClick: PropTypes.func
  };

  static defaultProps = {
    processing: false
  };

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
    return this.cropper.replace.apply(this, args);
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
    return this.cropper.move.apply(this, args);
  }

  moveTo(...args) {
    return this.cropper.moveTo.apply(this, args);
  }

  zoom(...args) {
    return this.cropper.zoom.apply(this, args);
  }

  zoomTo(...args) {
    return this.cropper.zoomTo.apply(this, args);
  }

  rotate(...args) {
    return this.cropper.rotate.apply(this, args);
  }

  rotateTo(...args) {
    return this.cropper.rotateTo.apply(this, args);
  }

  scale(...args) {
    return this.cropper.scale.apply(this, args);
  }

  scaleX(...args) {
    return this.cropper.scaleX.apply(this, args);
  }

  scaleY(...args) {
    return this.cropper.scaleY.apply(this, args);
  }

  getData(...args) {
    return this.cropper.getData.apply(this, args);
  }

  setData(...args) {
    return this.cropper.setData.apply(this, args);
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
    return this.cropper.setCanvasData.apply(this, args);
  }

  getCropBoxData() {
    return this.cropper.getCropBoxData();
  }

  setCropBoxData(...args) {
    return this.cropper.setCropBoxData.apply(this, args);
  }

  getCroppedCanvas(...args) {
    return this.cropper.getCroppedCanvas.apply(this, args);
  }

  setAspectRatio(...args) {
    return this.cropper.setAspectRatio.apply(this, args);
  }

  setDragMode(...args) {
    return this.cropper.setDragMode.apply(this, args);
  }

  render() {
    const {
      className,
      processing,
      onClick,
      onDoubleClick,
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
          {...props}
        />
      </div>
    );
  }
}
