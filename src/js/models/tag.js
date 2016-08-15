/* eslint-disable */
import _ from "lodash";
import mongoose, { Schema } from "mongoose";

const TagSchema = new Schema({
  user: { type: Schema.Types.ObjectId, ref: "User" },
  name: { type: String, required: true },
  created: { type: Date, default: Date.now },
  modified: { type: Date, default: Date.now }
}, {
  versionKey: false
});

TagSchema.set("toJSON", { virtuals: true });
TagSchema.set("toObject", { virtuals: true });


// Static methods
TagSchema.statics.findAllByUser = function(user, query = {}) {
  const params = { ...query, user };
  return this.find(params);
};

TagSchema.statics.appendByUserAndName = function(user, name) {
  const entity = new this({
    user,
    name
  });

  return entity.save();
};

TagSchema.statics.removeByUserAndId = function(user, id) {
  // TODO: Eliminate the dependence of the item
  return this.findOne({ _id: id, user })
    .then(entity =>
      entity.remove().then(() => entity)
    );
};


export default mongoose.model("Tag", TagSchema);
