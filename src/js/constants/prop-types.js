import { PropTypes } from "react";
import * as Order from "./order";

export const origin = PropTypes.shape({
  vertical: PropTypes.oneOf(["top", "middle", "bottom"]),
  horizontal: PropTypes.oneOf(["left", "center", "right"])
});

export const position = PropTypes.shape({
  top: PropTypes.number,
  left: PropTypes.number
});

export const order = PropTypes.oneOf([Order.ASC, Order.DESC]);
