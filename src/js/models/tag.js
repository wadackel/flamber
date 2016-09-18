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
TagSchema.statics.findByUserAndId = function(user, id) {
  return this.findOne({ user, _id: id });
};

TagSchema.statics.findByUserAndName = function(user, name) {
  return this.findOne({ user, name });
};

TagSchema.statics.findAllByUser = function(user, query = {}) {
  const params = { ...query, user };
  return this.find(params);
};

TagSchema.statics.appendByUserAndName = function(user, name) {
  return this.findByUserAndName(user, name)
    .then(entity => {
      if (entity) {
        throw new Error(`${name} is already exists`);
      }

      return null;
    })
    .then(() => {
      const entity = new this({
        user,
        name
      });

      return entity.save();
    });
};

TagSchema.statics.updateByUserAndIdFromObject = function(user, id, newProps) {
  const fields = _.keys(this.schema.paths);

  return this.findOne({ _id: id, user })
    .then(entity => {
      fields.forEach(key => {
        if (newProps.hasOwnProperty(key)) {
          entity[key] = newProps[key];
        }
      });

      entity.modified = new Date();

      return entity.save();
    });
};

TagSchema.statics.removeByUserAndId = function(user, id) {
  return this.findOne({ _id: id, user })
    .then(entity =>
      entity.remove().then(() => entity)
    );
};


// Middleware
TagSchema.pre("remove", function(next) {
  this.model("Item").update(
    { tags: this._id },
    { $pull: { tags: this._id } },
    { multi: true },
    next
  );
});


export default mongoose.model("Tag", TagSchema);
