// @flow
import autoBind from "auto-bind";
import React, { Component } from "react";
import ReactCropper from "../../../utils/react-cropper";
import bem from "../../../helpers/bem";
import mergeClassNames from "../../../helpers/merge-class-names";
import { ProcessingOverlay } from "../";
import type {
  CropperData,
  CropperContainerData,
  CropperCanvasData,
  CropperSetCanvasData,
  CropperImageData,
  CropperBoxData,
  CropperCroppedCanvasOptions,
  CropperDragMode
} from "../../../utils/react-cropper";

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

  cropper: ?ReactCropper = null;

  constructor(props: Props, context: Object) {
    super(props, context);
    autoBind(this);
  }

  handleReady() {
    const { zoomTo } = this.props;

    if (typeof zoomTo === "number" && !isNaN(zoomTo)) {
      this.zoomTo(zoomTo);
    }

    if (typeof this.props.ready === "function") {
      this.props.ready();
    }
  }

  // Methods by: https://github.com/fengyuanchen/cropperjs#methods
  crop(): void {
    if (!this.cropper) return;
    this.cropper.crop();
  }

  reset(): void {
    if (!this.cropper) return;
    this.cropper.reset();
  }

  clear(): void {
    if (!this.cropper) return;
    this.cropper.clear();
  }

  replace(url: string, onlyColorChanged?: boolean): void {
    if (!this.cropper) return;
    this.cropper.replace(url, onlyColorChanged);
  }

  enable(): void {
    if (!this.cropper) return;
    this.cropper.enable();
  }

  disable(): void {
    if (!this.cropper) return;
    this.cropper.disable();
  }

  destroy(): void {
    if (!this.cropper) return;
    this.cropper.destroy();
  }

  move(offsetX: number, offsetY?: number): void {
    if (!this.cropper) return;
    this.cropper.move(offsetX, offsetY);
  }

  moveTo(x: number, y?: number): void {
    if (!this.cropper) return;
    this.cropper.moveTo(x, y);
  }

  zoom(ratio: number): void {
    if (!this.cropper) return;
    this.cropper.zoom(ratio);
  }

  zoomTo(ratio: number): void {
    if (!this.cropper) return;
    this.cropper.zoomTo(ratio);
  }

  rotate(degree: number): void {
    if (!this.cropper) return;
    this.cropper.rotate(degree);
  }

  rotateTo(degree: number): void {
    if (!this.cropper) return;
    this.cropper.rotateTo(degree);
  }

  scale(scaleX: number, scaleY?: number): void {
    if (!this.cropper) return;
    this.cropper.scale(scaleX, scaleY);
  }

  scaleX(scaleX: number): void {
    if (!this.cropper) return;
    this.cropper.scaleX(scaleX);
  }

  scaleY(scaleY: number): void {
    if (!this.cropper) return;
    this.cropper.scaleY(scaleY);
  }

  getData(rounded?: boolean): ?CropperData {
    if (!this.cropper) return null;
    return this.cropper.getData(rounded);
  }

  setData(setData: CropperData): void {
    if (!this.cropper) return;
    this.cropper.setData(setData);
  }

  getContainerData(): ?CropperContainerData {
    if (!this.cropper) return null;
    return this.cropper.getContainerData();
  }

  getImageData(): ?CropperImageData {
    if (!this.cropper) return null;
    return this.cropper.getImageData();
  }

  getCanvasData(): ?CropperCanvasData {
    if (!this.cropper) return null;
    return this.cropper.getCanvasData();
  }

  setCanvasData(data: CropperSetCanvasData): void {
    if (!this.cropper) return;
    return this.cropper.setCanvasData(data);
  }

  getCropBoxData(): ?CropperBoxData {
    if (!this.cropper) return null;
    return this.cropper.getCropBoxData();
  }

  setCropBoxData(data: CropperBoxData): void {
    if (!this.cropper) return;
    this.cropper.setCropBoxData(data);
  }

  getCroppedCanvas(options: CropperCroppedCanvasOptions): ?HTMLCanvasElement {
    if (!this.cropper) return null;
    return this.cropper.getCroppedCanvas(options);
  }

  setAspectRatio(aspectRatio: number): void {
    if (!this.cropper) return;
    this.cropper.setAspectRatio(aspectRatio);
  }

  setDragMode(mode: CropperDragMode): void {
    if (!this.cropper) return;
    return this.cropper.setDragMode(mode);
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
