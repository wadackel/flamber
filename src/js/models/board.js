/* eslint-disable */
import mongoose, { Schema } from "mongoose";
import Item from "./item";

const BoardSchema = new Schema({
  name: { type: String, required: true },
  items: [{ type: Schema.Types.ObjectId, ref: "Item" }],
  created: { type: Date, default: Date.now },
  modified: { type: Date, default: Date.now }
});

BoardSchema.set("toJSON", { virtuals: true });
BoardSchema.set("toObject", { virtuals: true });


// Instance methods
BoardSchema.statics.findAll = function(drive, query = {}) {
  return this.find(query)
    .populate("items")
    .then(boards =>
      Promise.all(boards.map(board =>
        Item.updateEntitiesThumbnailIfNeeded(drive, board.items)
      )).then(() => boards)
    );
};

BoardSchema.statics.removeById = function(drive, id) {
  return this.findById(id)
    .then(entity =>
      Promise.all(entity.items.map(id => Item.removeById(drive, id)))
        .then(() => entity)
    )
    .then(entity =>
      this.findByIdAndRemove(entity.id)
        .then(() => entity)
    );
};


export default mongoose.model("Board", BoardSchema);
