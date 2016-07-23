import palette from "palette";

export default function getImagePalette(image) {
  const canvas = document.createElement("canvas");
  const ctx = canvas.getContext("2d");
  canvas.width = image.naturalWidth;
  canvas.height = image.naturalHeight;
  ctx.fillStyle = "white";
  ctx.fillRect(0, 0, canvas.width, canvas.height);
  ctx.drawImage(image, 0, 0);

  const results = palette(canvas);

  return results.map(arr => ({
    r: arr[0],
    g: arr[1],
    b: arr[2]
  }));
}
