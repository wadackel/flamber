// @flow
import type { TagId } from "./tag";

export type ItemId = string;

export type Item = {
  id: ItemId;
  tags: Array<TagId>;
};

export type ItemEntity = $All<Item, {
}>;

export type Items = Array<Item>;
