// @flow
export type ItemId = string;

export type Item = {
  id: ItemId;
  file_id: string;
  name: string;
  description: string;
  url: string;
  size: number;
  type: string;
  image: string;
  width: number;
  height: number;
  thumbnail: string;
  palette: string;
  star: boolean;
  views: number;
  viewed_at: Date;
  created_at: Date;
  updated_at: Date;
};

export type ItemEntity = $All<Item, {
  select: boolean;
  isUpdating: boolean;
  isMoving: boolean;
  isDeleting: boolean;
  isNameUpdating: boolean;
  isDescriptionUpdating: boolean;
  isImageUpdating: boolean;
  isTagAdding: boolean;
}>;

export type Items = Array<Item>;

export type ItemEntities = Array<ItemEntity>;
