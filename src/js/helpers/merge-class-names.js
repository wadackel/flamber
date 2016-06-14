export default function mergeClassNames(...classNames) {
  const array = classNames
    .filter(className => className && typeof className === "string" && className.trim() !== "")
    .map(className => className.trim().split(" "));

  return [].concat([], ...array).join(" ");
}
