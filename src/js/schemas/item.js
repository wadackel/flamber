import { Schema } from "normalizr";

export default new Schema("items", {
  defaults: {
    select: false,
    isUpdating: false,
    isMoving: false,
    isDeleting: false
  }
});
