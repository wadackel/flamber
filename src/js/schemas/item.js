import { Schema } from "normalizr";

const ItemSchema = new Schema("items", {
  assignEntity(output, key, value, input) {
    if (key === "thumbnail") {
      const width = Math.min(500, input.width);
      value = value.replace(/^(.+)=s\d+$/, `$1=s${width}`); // eslint-disable-line no-param-reassign
    }

    output[key] = value;
  },
  defaults: {
    select: false,
    isUpdating: false,
    isMoving: false,
    isDeleting: false
  }
});

export default ItemSchema;
