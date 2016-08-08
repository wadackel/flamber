import { Schema } from "normalizr";

const BoardSchema = new Schema("boards", {
  defaults: {
    select: false,
    isUpdating: false,
    isDeleting: false
  }
});

export default BoardSchema;
