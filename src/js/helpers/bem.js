import { B } from "b_";

const b = B({
  tailSpace: " ",
  elementSeparator: "__",
  modSeparator: "--",
  modValueSeparator: "-",
  classSeparator: ""
});

export default function bem(className) {
  return b.with(className);
}
