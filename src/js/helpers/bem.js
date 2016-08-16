import block from "bem-cn";

block.setup({
  el: "__",
  mod: "--",
  modValue: "-"
});

export default function bem(className) {
  return block(className);
}
