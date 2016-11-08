// @flow
export type Origin = {
  vertical: "top" | "middle" | "bottom";
  horizontal: "left" | "center" | "right";
};

export type Offset = {
  top: number;
  left: number;
};

export type Positions = {
  top: any;
  right: any;
  bottom: any;
  left: any;
};

export type Order = "asc" | "desc";

export type OrderBy = "name" | "created_at" | "updated_at" | "viewed_at";

export type Color = string;

export type Colors = Array<string>;

export type Palette = Colors;

export type Size = {
  width: number;
  height: number;
};

export type SizeString = "xl" | "lg" | "md" | "sm" | "xs";

export type GalleryLayout = "gallery";
export type GridLayout = "grid";
export type ListLayout = "list";
export type Layout = GalleryLayout | GridLayout | ListLayout;
export type BoardsLayout = GridLayout | ListLayout;
export type ItemsLayout = Layout;

export type DropDownBoardValue = {
  name: string;
  value: any;
};

export type DropDownBoardValues = Array<DropDownBoardValue>;

export type Theme = "dark" | "light";
