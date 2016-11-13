// @flow
import type { Options } from "../types/options";

const defaultOptions: Options = {
  theme: "dark",
  boardsLayout: "grid",
  boardsOrderBy: "created_at",
  boardsOrder: "asc",
  itemsLayout: "gallery",
  itemsSize: 300,
  itemsOrderBy: "created_at",
  itemsOrder: "asc"
};

export default defaultOptions;
