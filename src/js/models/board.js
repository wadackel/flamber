/* eslint-disable */
import _ from "lodash";
import mongoose, { Schema } from "mongoose";
import Item from "./item";

const BoardSchema = new Schema({
  user: { type: Schema.Types.ObjectId, ref: "User" },
  name: { type: String, required: true },
  items: [{ type: Schema.Types.ObjectId, ref: "Item" }],
  created: { type: Date, default: Date.now },
  modified: { type: Date, default: Date.now }
}, {
  versionKey: false
});

BoardSchema.set("toJSON", { virtuals: true });
BoardSchema.set("toObject", { virtuals: true });


// Static methods
BoardSchema.statics.findAll = function(drive, user, query = {}) {
  const params = {
    ...query,
    user
  };

  return this.find(params)
    .populate("items")
    .then(boards =>
      Promise.all(boards.map(board =>
        Item.updateEntitiesThumbnailIfNeeded(drive, board.items)
      )).then(() => boards)
    );
};

BoardSchema.statics.removeById = function(drive, user, id) {
  return this.findOne({ _id: id, user })
    .then(entity =>
      Promise.all(entity.items.map(id => Item.removeById(drive, id)))
        .then(() => entity)
    )
    .then(entity =>
      this.findByIdAndRemove(entity.id)
        .then(() => entity)
    );
};

BoardSchema.statics.updateByIdFromObject = function(user, id, newProps) {
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


export default mongoose.model("Board", BoardSchema);
