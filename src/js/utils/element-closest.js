// @flow
export default function elementClosest(el: HTMLElement, target: any) {
  let node: ?Node = target.parentNode;

  while (node != null) {
    if (node === el) return true;
    node = node.parentNode;
  }

  return false;
}
