// import _ from "lodash";
// import ColorClassifier from "color-classifier";
// import colorPalette from "../constants/palette";
// import palette from "palette";

// const colorClassifier = new ColorClassifier(colorPalette);

export default function getImagePalette(image) {
  return [];
  // const canvas = document.createElement("canvas");
  // const ctx = canvas.getContext("2d");
  // canvas.width = image.naturalWidth;
  // canvas.height = image.naturalHeight;
  // ctx.fillStyle = "white";
  // ctx.fillRect(0, 0, canvas.width, canvas.height);
  // ctx.drawImage(image, 0, 0);
  //
  // const colors = palette(canvas).map(arr =>
  //   colorClassifier.classify({
  //     r: arr[0],
  //     g: arr[1],
  //     b: arr[2]
  //   }, "hex")
  // );
  //
  // return _.uniq(colors);
}
