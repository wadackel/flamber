import { Schema } from "normalizr";

const BoardSchema = new Schema("boards", {
  assignEntity(output, key, value, input) {
    if (key === "Cover" && input.Cover) {
      output.coverImage = input.Cover.thumbnail;
    }
    output[key] = value;
  },
  defaults: {
    select: false,
    coverImage: null,
    isUpdating: false,
    isDeleting: false
  }
});

export default BoardSchema;
