import { Schema, arrayOf } from "normalizr";
import ItemSchema from "./item";

const BoardSchema = new Schema("boards", {
  defaults: {
    select: false,
    isUpdating: false,
    isDeleting: false
  }
});

BoardSchema.define({
  items: arrayOf(ItemSchema)
});

export default BoardSchema;
