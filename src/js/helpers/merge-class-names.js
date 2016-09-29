// @flow
type ClassNameFunction = (val?: any, ...args?: Array<any>) => ?string;
type ClassName = ?string | ?ClassNameFunction;

export default function mergeClassNames(...classNames: Array<ClassName>): string {
  const array: Array<?string> = classNames
    .map((className: ClassName): ?string => {
      let str: ?string = null;

      if (!className) return str;

      if (typeof className === "function") {
        const res: ?string = className();
        str = res != null ? res.trim() : null;

      } else if (typeof className === "string") {
        str = className.trim();
      }

      return str;
    })
    .filter((str: ?string): boolean => !!str);

  return [].concat([], ...array).join(" ");
}
