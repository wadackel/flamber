// @flow
import { Schema } from "normalizr";

const FeedSchema = new Schema("feeds", {
  defaults: {
    isUpdating: false,
    isDeleting: false
  }
});

export default FeedSchema;
