/* eslint-disable */
import mongoose, { Schema } from "mongoose";

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
    .populate("items");
};


export default mongoose.model("Board", BoardSchema);
