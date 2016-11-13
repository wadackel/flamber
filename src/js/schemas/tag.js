import { Schema } from "normalizr";

const TagSchema = new Schema("tags", {
  defaults: {
    isSaved: true,
    isUpdating: false,
    isDeleting: false
  }
});

export default TagSchema;
