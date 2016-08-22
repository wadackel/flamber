const HEX_SHORT = /^#([a-fA-F0-9]{3})$/;
const HEX = /^#([a-fA-F0-9]{6})$/;

function normalizeHex(hex) {
  if (HEX.test(hex)) {
    return hex;

  } else if (HEX_SHORT.test(hex)) {
    const r = hex.slice(1, 2);
    const g = hex.slice(2, 3);
    const b = hex.slice(3, 4);
    return `#${r + r}${g + g}${b + b}`;
  }

  return null;
}

export function hexToRgb(hex) {
  const normalizedHex = normalizeHex(hex);

  if (normalizedHex == null) {
    return null;
  }

  const m = normalizedHex.match(HEX);
  const i = parseInt(m[1], 16);
  const r = (i >> 16) & 0xFF;
  const g = (i >> 8) & 0xFF;
  const b = i & 0xFF;

  return { r, g, b };
}
