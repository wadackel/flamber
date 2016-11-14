// @flow
import { Component } from "react";
import ExecutionEnvironment from "exenv";

/* eslint-disable no-unused-vars */
type _Size = {
  width: number;
  height: number;
};

type _NaturalSize = {
  naturalWidth: number;
  naturalHeight: number;
};

type _Scale = {
  scaleX: number;
  scaleY: number;
};

type _Offset = {
  left: number;
  top: number;
};

type _ImageData = $All<_Size, _NaturalSize>;

export type CropperData = $All<_Size, _Scale, {
  x: number;
  y: number;
  rotate: number;
}>;

export type CropperContainerData = _Size;

export type CropperImageData = $All<_Offset, _Size, _NaturalSize, _Scale, {
  aspectRatio: number;
  rotate: number;
}>;

export type CropperCanvasData = $All<_Offset, _Size, _NaturalSize>;

export type CropperSetCanvasData = $All<_Offset, _Size>;

export type CropperBoxData = CropperSetCanvasData;

export type CropperCroppedCanvasOptions = $All<_Size, { fillColor: any }>;

export type CropperDragMode = "none" | "crop" | "move";

const mockData: CropperData = {
  x: NaN,
  y: NaN,
  width: NaN,
  height: NaN,
  rotate: NaN,
  scaleX: NaN,
  scaleY: NaN
};

const mockContainerData: CropperContainerData = { width: NaN, height: NaN };

const mockImageData: CropperImageData = {
  left: NaN,
  top: NaN,
  width: NaN,
  height: NaN,
  naturalWidth: NaN,
  naturalHeight: NaN,
  aspectRatio: NaN,
  rotate: NaN,
  scaleX: NaN,
  scaleY: NaN
};

const mockCanvasData: CropperCanvasData = {
  left: NaN,
  top: NaN,
  width: NaN,
  height: NaN,
  naturalWidth: NaN,
  naturalHeight: NaN
};

const mockCropBoxData: CropperBoxData = {
  left: NaN,
  top: NaN,
  width: NaN,
  height: NaN
};

const throwError = () => {
  if (!ExecutionEnvironment.canUseDOM) {
    throw new Error("Please run in browser");
  }
};

class ReactCropperMock extends Component {
  crop(): void {}
  reset(): void {}
  clear(): void {}
  replace(url: string, onlyColorChanged?: boolean): void {}
  enable(): void {}
  disable(): void {}
  destroy(): void {}
  move(offsetX: number, offsetY?: number): void {}
  moveTo(x: number, y?: number): void {}
  zoom(ratio: number): void {}
  zoomTo(ratio: number): void {}
  rotate(degree: number): void {}
  rotateTo(degree: number): void {}
  scale(scaleX: number, scaleY?: number): void {}
  scaleX(scaleX: number): void {}
  scaleY(scaleY: number): void {}
  getData(rounded?: boolean): CropperData {
    throwError();
    return mockData;
  }
  setData(data: CropperData): void {}
  getContainerData(): CropperContainerData {
    throwError();
    return mockContainerData;
  }
  getImageData(): CropperImageData {
    throwError();
    return mockImageData;
  }
  getCanvasData(): CropperCanvasData {
    throwError();
    return mockCanvasData;
  }
  setCanvasData(data: CropperSetCanvasData): void {}
  getCropBoxData(): CropperBoxData {
    throwError();
    return mockCropBoxData;
  }
  setCropBoxData(data: CropperBoxData): void {}
  getCroppedCanvas(options?: CropperCroppedCanvasOptions): HTMLCanvasElement {
    throwError();
    return new HTMLCanvasElement();
  }
  setAspectRatio(aspectRatio: number): void {}
  setDragMode(mode?: CropperDragMode): void {}
}
/* eslint-enable no-unused-vars */

let ReactCropper = null;

if (ExecutionEnvironment.canUseDOM) {
  ReactCropper = require("react-cropper").default;
} else {
  ReactCropper = ReactCropperMock;
}

export default ReactCropper;
