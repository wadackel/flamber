// @flow
import { Schema } from "normalizr";

const typeCasts = {
  string(v: string) {
    return v;
  },
  number(v: string) {
    return parseInt(v, 10);
  }
};

const OptionSchema = new Schema("options", {
  /* eslint-disable no-param-reassign */
  assignEntity(output, key, value, input) {
    if (key === "value") {
      value = typeCasts[input.type](value);
    }
    output[key] = value;
  }
  /* eslint-enable no-param-reassign */
});

export default OptionSchema;
