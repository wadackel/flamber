import mongoose, { Schema } from "mongoose";

const BoardSchema = new Schema({
  name: { type: String, required: true },
  firstItem: { type: Schema.Types.ObjectId, ref: "Item" },
  itemCount: { type: Number, default: 0 },
  created: { type: Date, default: Date.now },
  modified: { type: Date, default: Date.now }
});

BoardSchema.set("toJSON", { virtuals: true });
BoardSchema.set("toObject", { virtuals: true });

export default mongoose.model("Board", BoardSchema);
