// @flow
import block from "bem-cn";

block.setup({
  el: "__",
  mod: "--",
  modValue: "-"
});

export default function bem(className: string): Function {
  return block(className);
}
