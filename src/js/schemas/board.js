import { Schema } from "normalizr";

export default new Schema("boards", {
  defaults: {
    select: false,
    isUpdating: false,
    isDeleting: false
  }
});
