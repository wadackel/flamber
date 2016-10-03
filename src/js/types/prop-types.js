export type Origin = {
  vertical: "top" | "middle" | "bottom";
  horizontal: "left" | "center" | "right";
};

export type Offset = {
  top: number;
  left: number;
};

export type Positions = {
  top: number;
  right: number;
  bottom: number;
  left: number;
};

export type Order = "asc" | "desc";

export type OrderBy = "name" | "created" | "modified" | "last_view";

export type Size = {
  width: number;
  height: number;
};

export type SizeString = "xl" | "lg" | "md" | "sm" | "xs";

export type DropDownBoardValue = {
  name: string;
  value: any;
};

export type DropDownBoardValues = Array<DropDownBoardValue>;
