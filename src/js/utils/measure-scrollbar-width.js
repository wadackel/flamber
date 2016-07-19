export default function measureScrollbarWidth() {
  if (typeof window === "undefined") {
    return 0;
  }

  const { body } = document;
  const div = document.createElement("div");

  div.setAttribute("style", `
    position: absolute;
    top: -9999px;
    width: 50px;
    height: 50px;
    overflow: scroll;
  `);
  body.appendChild(div);

  const scrollbarWidth = div.offsetWidth - div.clientWidth;
  body.removeChild(div);

  return scrollbarWidth;
}
