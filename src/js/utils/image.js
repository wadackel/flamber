// @flow
import { uniq } from "lodash";
import ExecutionEnvironment from "exenv";
import ColorThief from "color-thief-browser";
import ColorClassifier from "color-classifier";
import colorPalette from "../constants/palette";
const bluempCanvasToBlob = ExecutionEnvironment.canUseDOM ? require("blueimp-canvas-to-blob") : null;


type ImageType = "jpeg" | "png" | "gif";

const colorClassifier = new ColorClassifier(colorPalette);

const throwErrorIfServerSide = (throwError: boolean): ?Error => {
  if (!ExecutionEnvironment.canUseDOM) {
    const error = new Error("It needs to be executed on browser");

    if (throwError) {
      throw error;
    } else {
      return error;
    }
  }
};


export function dataURLtoBlob(dataURL: string): Blob {
  throwErrorIfServerSide(true);
  if (typeof bluempCanvasToBlob !== "function") throw new Error("It needs to be executed on browser");

  return bluempCanvasToBlob(dataURL);
}


export function imageElementToDataURL(image: HTMLImageElement, type: ImageType = "jpeg"): ?string {
  throwErrorIfServerSide(true);

  const canvas = document.createElement("canvas");
  const ctx = canvas.getContext("2d");
  if (!ctx) return null;

  canvas.width = image.naturalWidth;
  canvas.height = image.naturalHeight;
  ctx.fillStyle = "white";
  ctx.fillRect(0, 0, canvas.width, canvas.height);
  ctx.drawImage(image, 0, 0);

  return canvas.toDataURL(`image/${type}`);
}


export function imageElementToBlob(image: HTMLImageElement, type: ImageType = "jpeg"): ?Blob {
  const dataURL = imageElementToDataURL(image, type);
  return dataURL != null ? dataURLtoBlob(dataURL) : null;
}


export function getImageElementByBlob(blob: Blob): Promise<HTMLImageElement> {
  return new Promise((resolve, reject) => {
    const image = new Image();

    image.onload = () => {
      resolve(image);
    };

    image.onerror = (err: Error) => {
      reject(err);
    };

    image.src = URL.createObjectURL(blob);
  });
}


export function getImageElementByFile(file: File): Promise<HTMLImageElement> {
  return new Promise((resolve, reject) => {
    const error = throwErrorIfServerSide(false);

    if (error instanceof Error) {
      return reject(error);
    }

    const reader = new FileReader();

    reader.onload = () => {
      const image = new Image();
      image.src = reader.result;
      resolve(image);
    };

    reader.onerror = (err: Error) => {
      reject(err);
    };

    reader.readAsDataURL(file);
  });
}


export function getImagePalette(image: HTMLImageElement): Array<string> {
  throwErrorIfServerSide(true);

  const colorThief = new ColorThief();
  const color = colorThief.getColor(image);
  const palette = colorThief.getPalette(image);

  const colors = [color, ...palette].map(arr =>
    colorClassifier.classify({
      r: arr[0],
      g: arr[1],
      b: arr[2]
    }, "hex")
  );

  return uniq(colors);
}
