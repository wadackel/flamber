// @flow
import { Schema } from "normalizr";

const ItemSchema = new Schema("items", {
  /* eslint-disable no-param-reassign */
  assignEntity(output, key, value) {
    if (key === "palette") {
      value = value.split(",");
    }

    output[key] = value;
  },
  /* eslint-enable no-param-reassign */
  defaults: {
    select: false,
    isUpdating: false,
    isMoving: false,
    isDeleting: false,

    // State of each props
    isNameUpdating: false,
    isDescriptionUpdating: false,
    isPaletteUpdating: false,
    isImageUpdating: false,
    isTagAdding: false
  }
});

export default ItemSchema;
