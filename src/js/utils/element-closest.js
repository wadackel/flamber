export default function elementClosest(el, target) {
  let node = target.parentNode;

  while (node !== null) {
    if (node === el) return true;
    node = node.parentNode;
  }

  return false;
}
