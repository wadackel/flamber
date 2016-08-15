import { Schema } from "normalizr";

const TagSchema = new Schema("tags", {
  defaults: {
    isUpdating: false,
    isDeleting: false
  }
});

export default TagSchema;
